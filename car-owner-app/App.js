import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { BookingsScreen, ListingScreen, SignInScreen } from './src/screens'
import BookingsScreen from './src/screens/BookingsScreen';
import ListingScreen from './src/screens/ListingScreen';
import SignInScreen from './src/screens/SignInScreen';
import { useEffect, useState } from 'react';
import { auth } from "./firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function App() {
  const [currentUser, setCurrentUser] = useState()

  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

  const logout = async () => {
    try {
        if (auth.currentUser === null) {
            console.log("no user has logged in")
        }
        else {                
            await signOut(auth)
            console.log("sign out success")
        }
        setCurrentUser(null)
    } catch (err) {
        console.log(err)
    }
}


  useEffect(() => {
    const unsubscribeToUserDataChanges = onAuthStateChanged(auth, (user) => {
      console.log("user is ", user)
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribeToUserDataChanges
  })

  return (
    currentUser ?     (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Listing'>
        <Tab.Screen name="Listing" component={ListingScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'blue' : 'black' }}>Vehicles</Text>
            ),
            headerRight: () => (
              <Button
                onPress={logout}
                title="Logout"
                // color="#000" // Color might not be supported depending on the platform; adjust accordingly.
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="car" color={"black"} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Bookings" component={BookingsScreen}
          options={{
            // headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'blue' : 'black' }}>Bookings</Text>
            ),
            headerRight: () => (
              <Button
                onPress={() => alert('Button Pressed')}
                title="Logout"
                // color="#000" // Color might not be supported depending on the platform; adjust accordingly.
              />
            ),
            tabBarIcon: () => (
              <FontAwesome name="calendar" color={"black"} size={20} />
            ),
          }}
        />
        </Tab.Navigator>
      </NavigationContainer>
    )
    :
    (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='SignIn' 
          screenOptions={ {headerStyle: {backgroundColor: 'orangered'}, 
          headerTintColor: '#fff', 
          headerTitleStyle: {fontWeight: 'bold'}, } 
          }>
            
            <Stack.Screen name="SignIn" component={SignInScreen} />
            {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
            {/* <Stack.Screen name="Listing" component={ListingScreen} /> */}
            {/* <Stack.Screen name="Bookings" component={BookingsScreen} /> */}

          </Stack.Navigator>

      </NavigationContainer>
    )

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

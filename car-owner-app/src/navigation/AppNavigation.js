import { StyleSheet, Text, View, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationOptionsContext, NavigationOptionsProvider } from '../providers/TabNavigationProvider';
import BookingsScreen from '../screens/BookingsScreen';
import ListingScreen from '../screens/ListingScreen';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"

const Tab = createBottomTabNavigator()

export default AppNavigation = () => {
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

    return (
        <NavigationOptionsProvider>
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
                  onPress={logout}
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
      </NavigationOptionsProvider>
    )
}
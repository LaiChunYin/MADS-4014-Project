import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './View/MapScreen';
import BookingsScreen from './View/BookingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInScreen from './View/SignInScreen';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebaseConfig"


const Tab = createBottomTabNavigator();

const App = () => {
  const [currentUser, setCurrentUser] = useState()

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
    currentUser ? (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Map"         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Map') {
                iconName = 'map-marker';
              } else if (route.name === 'Bookings') {
                iconName = 'bookmark'
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Map" component={MapScreen}/>
          <Tab.Screen name="Bookings" component={BookingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
    :
    <SignInScreen />

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;












// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';



// const BottomSheet = ({car}) => {

//   const bookButton = () => {

//   }

//   return (
//     <GestureHandlerRootView> {/* Wrap your component hierarchy with GestureHandlerRootView */}
//     <View style={styles.container}>
//       <Text style={styles.text}>This is a basic bottom sheet</Text>
//       {car && <Text style={styles.text}>{car.name}</Text>}
//       {car && <Text style={styles.text}>Price: ${car.price}</Text>}
//       <TouchableOpacity onPress={bookButton} style={styles.bookButton}>
//         <Text style={styles.text}>Book Now</Text>
//       </TouchableOpacity>
//     </View>
//     </GestureHandlerRootView>
//   );
// };

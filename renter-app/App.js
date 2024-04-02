import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './View/map';
import BookingsScreen from './View/bookings';


const Tab = createBottomTabNavigator();

function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>

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

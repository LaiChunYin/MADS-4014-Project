import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import BookingListItem from '../component/bookingListItem';



const BookingsScreen = () => {

  return (
    <View style={styles.container} >
      <BookingListItem />
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 5
  },

});

export default BookingsScreen;












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

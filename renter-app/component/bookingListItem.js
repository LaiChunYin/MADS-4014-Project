import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const BookingListItem = ({ car }) => {


//     Booking Date
// ○ License Plate
// ○ Pickup location
// ○ Price
// ○ Owner name and photo
// ○ Booking status
// ○ Booking confirmation code → appears only if the booking was approved



  return (
      <View style={styles.container}>
        <Text style={styles.text}>BMW M3</Text>
        <Text style={styles.text}>Booking Date: 12/2/24</Text>
        <Text style={styles.text}>License Plate: ABC 123</Text>
        <Text style={styles.text}>Pickup location: toronto, ON</Text>
        <Text style={styles.text}>Price: $8300</Text>
        <Text style={styles.text}>Owner name and photo: Jack</Text>
        <Text style={styles.text}>Booking status: confirmed</Text>
        <Text style={styles.text}>Booking confirmation code: #123</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BookingListItem;

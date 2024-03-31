import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const BottomSheet = ({ car }) => {
  const bookButton = () => {
    // Define the functionality for booking here
    console.log('Book button pressed');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a basic bottom sheet</Text>
        {car && <Text style={styles.text}>{car.name}</Text>}
        {car && <Text style={styles.text}>Price: ${car.price}</Text>}
        <TouchableOpacity onPress={bookButton} style={styles.bookButton}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: 20,
    width: "80%",
    height: 50,
    backgroundColor: 'gray',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
});

export default BottomSheet;

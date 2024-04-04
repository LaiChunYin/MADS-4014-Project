import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import BookingList from '../component/BookingList';



const BookingsScreen = () => {

  return (
    <View style={styles.container} >
      <BookingList />
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
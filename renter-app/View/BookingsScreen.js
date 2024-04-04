import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import BookingListItem from '../component/BookingListItem';



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
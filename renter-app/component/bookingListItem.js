import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator , FlatList, TouchableOpacity} from 'react-native';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig"

const FavouritesScreen = ({ navigation }) => {
  const COLLECTION_NAME = 'Bookings'; 
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavourites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const fetchedFavourites = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavourites(fetchedFavourites);
      console.log(`firestore data: ${querySnapshot}`)
    } catch (err) { 
      console.log(err.message)
  }
  setIsLoading(false);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);



  const renderFavouriteItem =({item})  => (
    <View style={styles.listItem}>
       <Text style={styles.title}>{item.vehicle} </Text>
       <Text style={styles.text}>{item.bookingConfirmationCode} </Text>
       <Text style={styles.text}>Booking Date: {item.bookingDate.toString()}</Text>
       <Text style={styles.text}>Booking Status: {item.bookingStatus}</Text>
       <Text style={styles.text}>Pickup location: {item.vehicle}</Text>
       <Text style={styles.text}>Price: {item.vehicle}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="blue" size="large" animating={true}/>
      ) : (
        <FlatList
          style={styles.videosList}
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={ (item) => renderFavouriteItem(item)}
        />
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1
  },
  FavHeader: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
  },
  videosList: {
    alignContent:"stretch",
    width:"100%",
  },
  listItem: {
   flexDirection: 'column',
   alignItems: 'flex-start',
   width: '100%',
   marginVertical: 10,
   backgroundColor: '#C6EBC5',
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
title: {
  fontSize: 15,
  textAlign: 'left',
  color: 'black',
  fontWeight: '600',
},
buttonText: {
  fontSize: 20,
  fontWeight: '600',
  color: 'white'
},
deleteButton: {
  marginTop: 5,
  width: "70%",
  height: 50,
  backgroundColor: 'red',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
disabledButton: {
  backgroundColor: 'gray'
},
separator: {
  height: 1.8,
  backgroundColor: '#CED0CE',
  width: '90%',
  alignSelf: 'center'
},
noFavouritesText: {
  flex: 1,
  fontSize: 20,
  fontWeight: '600',
  alignSelf: 'center',
  alignItems: 'center'
}
});

export default FavouritesScreen;





// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// const BookingListItem = ({ car }) => {


// //     Booking Date
// // ○ License Plate
// // ○ Pickup location
// // ○ Price
// // ○ Owner name and photo
// // ○ Booking status
// // ○ Booking confirmation code → appears only if the booking was approved



//   return (
//       <View style={styles.container}>
//         <Text style={styles.text}>BMW M3</Text>
//         <Text style={styles.text}>Booking Date: 12/2/24</Text>
//         <Text style={styles.text}>License Plate: ABC 123</Text>
//         <Text style={styles.text}>Pickup location: toronto, ON</Text>
//         <Text style={styles.text}>Price: $8300</Text>
//         <Text style={styles.text}>Owner name and photo: Jack</Text>
//         <Text style={styles.text}>Booking status: confirmed</Text>
//         <Text style={styles.text}>Booking confirmation code: #123</Text>
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     width: '100%',
//     backgroundColor: 'white',
//     marginHorizontal: 20,
//     padding: 16,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default BookingListItem;

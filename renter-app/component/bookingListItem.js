import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native';
import { collection, doc, getDoc, getDocs, deleteDoc, query } from 'firebase/firestore';
import { db, auth } from "../firebaseConfig"

const FavouritesScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, `/Renters/${auth.currentUser.email}/reservations`)));

      const getReservationPromises = querySnapshot.docs.map(async (document) => {
        console.log("getting booking id ", document.data().bookingId)

        const bookingRef = document.data().booking
        const bookingDoc = await getDoc(bookingRef)
        console.log("bookingdoc ", bookingDoc.data())

        const vehicleRef = bookingDoc.data().vehicle
        console.log("vehicle ref ", vehicleRef)
        const vehicleDoc = await getDoc(vehicleRef)

        const ownerRef = vehicleDoc.data().owner
        const ownerDoc = await getDoc(ownerRef)

        console.log("renter doc is ", ownerDoc.data())
        console.log("booking doc is ", bookingDoc.data())
        console.log("vehicle doc is ", vehicleDoc.data())
        console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
        // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
        console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "owner": {"id": ownerDoc.id, ...ownerDoc.data()}})
        // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
        console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": ownerDoc.id, ...ownerDoc.data()}})))
        return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "owner": {"id": ownerDoc.id, ...ownerDoc.data()}}
      })

      const result = await Promise.all(getReservationPromises)
      console.log("reservations are ", result)

      setReservations(result)
      setIsLoading(false)

    } catch (err) { 
      console.log("cannot fetch fav, ", err.message)
  }

  };

  useEffect(() => {
    // fetchReservations();

    (async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, `/Renters/${auth.currentUser.email}/reservations`)));
  
        const getReservationPromises = querySnapshot.docs.map(async (document) => {
          console.log("getting booking id ", document.data().bookingId)
  
          const bookingRef = document.data().booking
          const bookingDoc = await getDoc(bookingRef)
          console.log("bookingdoc ", bookingDoc.data())
  
          const vehicleRef = bookingDoc.data().vehicle
          console.log("vehicle ref ", vehicleRef)
          const vehicleDoc = await getDoc(vehicleRef)
  
          const ownerRef = vehicleDoc.data().owner
          const ownerDoc = await getDoc(ownerRef)
  
          console.log("renter doc is ", ownerDoc.data())
          console.log("booking doc is ", bookingDoc.data())
          console.log("vehicle doc is ", vehicleDoc.data())
          console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
          // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
          console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "owner": {"id": ownerDoc.id, ...ownerDoc.data()}})
          // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
          console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": ownerDoc.id, ...ownerDoc.data()}})))
          return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "owner": {"id": ownerDoc.id, ...ownerDoc.data()}}
        })
  
        const result = await Promise.all(getReservationPromises)
        console.log("reservations are ", result)
  
        setReservations(result)
        setIsLoading(false)
  
      } catch (err) { 
        console.log("cannot fetch fav, ", err.message)
    }
    })()
  }, []);


  const renderReservationItem = (item)  => {
    console.log("rendering item ", item)
    return (
    <View style={styles.listItem}>
       <Text style={styles.title}>{item.vehicle.name} </Text>
       <Image source = { {uri : item.vehicle.photoUrl}}  style={{ width: 100, height: 100 }} />
       <Text style={styles.text}>{item.vehicle.licensePlate} </Text>
       <Text style={styles.text}>{item.owner.name} </Text>
       <Image source = { {uri : item.owner.profilePicUrl}}  style={{ width: 50, height: 50 }} />
       <Text style={styles.text}>Booking Date: {new Date(item.booking.bookingDate.seconds * 1000).toUTCString()}</Text>
       <Text style={styles.text}>Booking Status: {item.booking.bookingStatus}</Text>
       <Text style={styles.text}>Pickup location: {item.vehicle.location}</Text>
       <Text style={styles.text}>Price: ${item.vehicle.price}</Text>
       <Text style={styles.text}>{item.booking.bookingConfirmationCode ?? ""} </Text>
    </View>
  )}

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="blue" size="large" animating={true}/>
      ) : (
        <FlatList
          style={styles.bookingsList}
          data={reservations}
          key={(item) => item.id}
          renderItem={ ({item}) => renderReservationItem(item)}
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
  bookingsList: {
    alignContent:"stretch",
    width:"100%",
  },
  listItem: {
   flexDirection: 'column',
   alignItems: 'flex-start',
   width: '100%',
   marginVertical: 10,
   backgroundColor: 'C6EBC5',
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

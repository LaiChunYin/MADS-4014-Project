import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import { useState, useRef } from 'react';



const BottomSheet = ({ car, getSwipePosition }) => {
const [gesturePosition, setGesturePosition] = useState({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Gesture has started. Show some visual feedback so the user knows
        // what is happening!
        console.log('Gesture started');
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.moveX, gestureState.moveY.
        // The accumulated gesture distance since becoming responder is
        // gestureState.dx, gestureState.dy.
        console.log(`gestureState.dy: ${gestureState.dy}`);
        if(gestureState.dy>0){
        setGesturePosition({ x: gestureState.dx, y: gestureState.dy });
        getSwipePosition(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // User has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
       
        console.log('Gesture released');
      },
    })
  ).current;

  function generateRandomFutureDate() {
    const today = new Date();
    const maxDaysToAdd = 120; 
  
    const randomDaysToAdd = Math.floor(Math.random() * maxDaysToAdd);
  
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + randomDaysToAdd);
  
    return futureDate;
  }


  const bookButton = () => {
    const bookingDate = generateRandomFutureDate();

    // add code to add booking doc to firebase
 
    console.log(`Booking date: ${bookingDate}`);
    console.log('Book button pressed');
  };

  return (
    <View  {...panResponder.panHandlers} style={[styles.container, {transform: [{translateY: gesturePosition.y}]}]} >
        <View style={styles.dragIndicator} />
        {car && <Text style={styles.text}>{car.name}</Text>}
        {car && <Text style={styles.text}>Price: ${car.price}</Text>}
        <Text style={styles.LocationText}>123 imagenary ave Toronto, ontario</Text>
        <TouchableOpacity onPress={bookButton} style={styles.bookButton}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    // transform: [{translateY: 60}], // pass dynamic value from guesture to scroll this
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 100,
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
  dragIndicator: {
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    width: '15%',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: 20,
    width: "70%",
    height: 50,
    backgroundColor: 'green',
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
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  LocationText: {
    fontSize: 14,
    fontWeight: '300',
  }
});

export default BottomSheet;



// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// const BottomSheet = ({ car }) => {
//   const bookButton = () => {
//     // Define the functionality for booking here
//     console.log('Book button pressed');
//   };

//   return (
//       <View style={styles.container}>
//         <Text style={styles.text}>This is a basic bottom sheet</Text>
//         {car && <Text style={styles.text}>{car.name}</Text>}
//         {car && <Text style={styles.text}>Price: ${car.price}</Text>}
//         <TouchableOpacity onPress={bookButton} style={styles.bookButton}>
//           <Text style={styles.buttonText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     padding: 16,
//     paddingBottom: 150,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   bookButton: {
//     marginTop: 20,
//     width: "80%",
//     height: 50,
//     backgroundColor: 'gray',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5
//   }
// });

// export default BottomSheet;
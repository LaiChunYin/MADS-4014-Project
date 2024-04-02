import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '../component/bottomSheet';

const PriceMarker = ({ price }) => {
  return (
    <View style={styles.priceTag}>
        <Text style={styles.price}>${price}</Text>
    </View>
  );
};



const MapScreen = () => {
  const [carList, setCarList] = useState([
    { id: 1, latitude: 37.78825, longitude: -122.4324, price: '30000', name: "Honda NSX"},
    { id: 2, latitude: 37.780, longitude: -122.4325, price: '8300', name: "BMW M3"},
    { id: 3, latitude: 37.754, longitude: -122.4336, price: '18500', name: "Nissan GTR"}
  ]);
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const showBottomSheet = (id) => {
    setBottomSheetVisible(!isBottomSheetVisible);
    setSelectedCar(carList.find(car => car.id === id));
  };

const getSwipePosition = (yAxis) => {
    if(yAxis>120){
      setBottomSheetVisible(false);
    }
  }

  return (
    
    <View style={styles.container} >
  
      <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
        {carList.map(car => (
          <TouchableOpacity key={car.id} onPress={() => showBottomSheet(car.id)}>
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
            // title={`Car ${car.id}`}
            >
            <View>
              <PriceMarker price={car.price}/> 
            </View>
          </Marker>
          </TouchableOpacity>
        ))}
      </MapView>
      {isBottomSheetVisible && <BottomSheet car={selectedCar} getSwipePosition={getSwipePosition}/>}
   
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  priceTag: {
    padding: 5,
    backgroundColor: 'orange',
    borderRadius: 10
  },
  price: {
    fontWeight: '500',
    color: 'white',
    fontSize: 12
  }
});

export default MapScreen;












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

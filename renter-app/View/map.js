import React, { cloneElement, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '../component/bottomSheet';
import * as Location from 'expo-location';
import { db } from "../firebaseConfig"
import { getDoc, getDocs, collection, query, updateDoc, doc } from "firebase/firestore"
import { FlatList } from 'react-native';

const PriceMarker = ({ price }) => {
  return (
    <View style={styles.priceTag}>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};



const MapScreen = () => {
  // const [carList, setCarList] = useState([
  //   { id: 1, latitude: 37.78825, longitude: -122.4324, price: '30000', name: "Honda NSX" },
  //   { id: 2, latitude: 37.780, longitude: -122.4325, price: '8300', name: "BMW M3" },
  //   { id: 3, latitude: 37.754, longitude: -122.4336, price: '18500', name: "Nissan GTR" }
  // ]);
  const [carList, setCarList] = useState([])
  // const [currentLocation, setCurrentLocation] = useState()
  const [currentLocation, setCurrentLocation] = useState({longitude: 0, latitude: 0})
  const [selectedCar, setSelectedCar] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(`Permission to access location was denied`)
        return
      }

      let location = await Location.getCurrentPositionAsync()
      console.log("now in ", JSON.stringify(location))
      return location.coords

    } catch (err) {
      console.log("error when getting location", err)
    }
  }

  const coordinatesToAddress = async (coords) => {
    try {
      const postalAddresses = await Location.reverseGeocodeAsync(coords, {})

      // const result = postalAddresses
      // if (result === undefined) {
      //   return
      // }
      console.log("address is ", postalAddresses)


      const output = `${postalAddresses.streetNumber} ${postalAddresses.street}, ${postalAddresses.city}, ${postalAddresses.region}`
      console.log("output is ", output)
      return postalAddresses[0]
    }
    catch (err) {
      console.log(err)
    }
  }

  const addressToCoordinates = async (address) => {
    try {
      address = "Infinite Loop Campus"
      console.log("converting address to coor ", address)
      const geocodedLocation = await Location.geocodeAsync(address)

      console.log("address ", address, " is converted to ", geocodedLocation)
      return geocodedLocation[0]
    } catch (err) {
      console.log(err)
    }
  }

  const checkCoorAndAddressInSameCity = async (coord1, coord2) => {
    console.log("coord1 and 2 are ", coord1, coord2)
    // const parsedAddress1 = coordinatesToAddress(coord1)
    // const parsedAddress2 = coordinatesToAddress(coord2)
    const [parsedAddress1, parsedAddress2] = await Promise.all([coordinatesToAddress(coord1), coordinatesToAddress(coord2)])

    console.log("parsed addr 1 is ", parsedAddress1)
    console.log("parsed addr 2 is ", parsedAddress2)
    if (parsedAddress1?.city === undefined || parsedAddress1?.city === null) {
      return false
    }
    if (parsedAddress1.city === parsedAddress2.city) {
      console.log("both in ", parsedAddress1.city)
      return true
    }
  }

  const showBottomSheet = (licensePlate) => {
    console.log("show bottom sheet id is ", licensePlate)
    setBottomSheetVisible(!isBottomSheetVisible);
    setSelectedCar(carList.find(car => car.licensePlate === licensePlate));
  };

  const getSwipePosition = (yAxis) => {
    if (yAxis > 120) {
      setBottomSheetVisible(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const currentLocation = await getCurrentLocation()
        const querySnapshot = await getDocs(query(collection(db, "Vehicles")))
        const getVehiclesPromises = querySnapshot.docs.map(async (document) => {
          let car = { "licensePlate": document.id, ...document.data() }
          console.log("car before is ", car)
          const carCoord = await addressToCoordinates(car.location)
          car = { ...car, ...carCoord }
          console.log("car is ", car)

          if (await checkCoorAndAddressInSameCity(carCoord, currentLocation)) {
            console.log("is in same city ", car)
            return car
          }
          console.log("not is same city ", car)
          return null
        })

        let result = await Promise.all(getVehiclesPromises)
        console.log("before filtering ", result)
        result = result.filter((car) => car !== null)
        console.log("after filtering ", result)
        console.log("remove non serializable values ", JSON.parse(JSON.stringify(result)))
        console.log("setting current location ", currentLocation)
        setCurrentLocation(currentLocation)
        setCarList(JSON.parse(JSON.stringify(result)))
      }
      catch (err) {
        console.log("error when setting car list ", err)
      }
    })()
  }, [])


  // return (
  //   <Text>{JSON.stringify(carList) ?? "no data"}</Text>
  // )

  return (

    <View style={styles.container} >

      {/* <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.1, longitudeDelta: 0.1 }}> */}
      <MapView style={styles.map} region={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
        { carList.length > 0 &&
        carList.map(car => (
          <TouchableOpacity key={car.licensePlate} onPress={() => showBottomSheet(car.licensePlate)}>
            <Marker
              key={car.licensePlate}
              coordinate={{ latitude: car.latitude, longitude: car.longitude }}
              title={`Car ${car.licensePlate}`}
            >
              <View>
                <PriceMarker price={car.price} />
              </View>
            </Marker>
          </TouchableOpacity>
        ))}
      </MapView>
      {isBottomSheetVisible && <BottomSheet car={selectedCar} getSwipePosition={getSwipePosition} />}

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
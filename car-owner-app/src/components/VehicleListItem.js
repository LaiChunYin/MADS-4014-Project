import { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator, ScrollView } from "react-native"
import { db, auth } from "../../firebaseConfig"
import { collection, setDoc, doc, getDoc, writeBatch } from "firebase/firestore";
import VehicleSuggestionList from "../components/VehicleSuggestionList";
import { useFocusEffect } from "@react-navigation/native"

export default VehicleListItem = ({vehicle}) => {
    useEffect(() => {
        console.log("vehicle item is ", vehicle)
    }, [])

    return (
        <View style={styles.listItem}>
            <Text style={styles.title}>{vehicle.name}</Text>
            <Image source = { {uri : vehicle.photoUrl}}  style={{ width: 100, height: 60 }} />
            <Text>License: {vehicle.licensePlate}</Text>
            <Text>Make: {vehicle.make}</Text>
            <Text>Model Year: {vehicle.modelYear}</Text>
            <Text>Location: {vehicle.location}</Text>
            <Text>Price: {vehicle.price}</Text>
            <Text>Capacity: {vehicle.capacity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',
      },
    listItem: {
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        alignContent: 'center',
        alignSelf: 'center',
        width: '90%',
        flex: 1,
        marginVertical: 5,
        backgroundColor: '#C6EBC5',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
           width: 0,
           height: -2,
        },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
     },
})
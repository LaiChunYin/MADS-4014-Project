import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default BookingListItem = ({item}) => {
    const navigation = useNavigation()

    return (
        // <Pressable onPress={() => navigation.navigate("BookingDetails", {booking: item})} >
        // <Pressable onPress={() => navigation.navigate("BookingDetails", JSON.parse(JSON.stringify({booking: item.booking, vehicle: item.vehicle, renter: item.renter})))} >
        <Pressable onPress={() => navigation.navigate("BookingDetails", JSON.parse(JSON.stringify(item)))} >
            {/* <Text style={{backgroundColor: "gray"}}>{item.name}</Text> */}
            <Text style={{backgroundColor: "gray"}}>{item.vehicle.name}</Text>
        </Pressable>
    )
}
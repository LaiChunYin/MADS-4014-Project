import { useContext, useEffect, useState, useLayoutEffect } from "react"
import { StyleSheet, Text, TextInput, Button, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { HeaderBackButton } from '@react-navigation/elements'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import "react-native-get-random-values"
import { v4 as uuid } from "uuid"
import { NavigationOptionsProvider, NavigationOptionsContext  } from "../providers/TabNavigationProvider"

const BookingDetailsScreen = ({ navigation, route }) => {

    const { vehicle, renter } = route.params;
    // const [renter, setRenter] = useState()
    const [ booking, setBooking ] = useState(route.params.booking)
    const { tabSetOptions, setTabSetOptions } = useContext(NavigationOptionsContext)

    useEffect(() => {
        (async () => {
            try {
                console.log("calling tabsetoptions ", tabSetOptions, setTabSetOptions)
                tabSetOptions({headerTitle: "Booking Details", headerLeft: () => <Button onPress={ () => { navigation.goBack(); console.log("resetting tab navigation bar"); tabSetOptions({headerTitle: "Bookings" }); } } title={"< Go Back"} /> })
                // navigation.setOptions({ headerShown: true, headerLeft: () => <Button onPress={ () => navigation.goBack() } title={"Go Back"} /> })
                console.log("in booking detail screen ", navigation.getState().routes[navigation.getState().index].name, navigation.getState().index)
                console.log("booking, vehicle detail is ", booking, vehicle)
        
                // const renterDoc = await getDoc(booking.renter)
                // const renterData = renterDoc.data()
                // console.log("renterdata is ", renterData)

                // setRenter(renterData)
            }
            catch(err) {
                console.log("cannot get renter: ", err)
            }
        })()
        
    }, [])

    const approveBooking = async () => {
        try {
            const confirmationCode = uuid()
            console.log("confirmation code is ", confirmationCode)
            const bookingRef = doc(db, "Bookings", booking.id)
            await updateDoc(bookingRef, {"bookingStatus": "Confirmed", "bookingConfirmationCode": confirmationCode})
            console.log("booking approved")

            setBooking({...booking, "bookingStatus": "Confirmed", "bookingConfirmationCode": confirmationCode})
        }
        catch(err) {
            console.log("cannot approve booking ", err)
        }
    }

    const declineBooking = async () => {
        try {
            const bookingRef = doc(db, "Bookings", booking.id)
            await updateDoc(bookingRef, {"bookingStatus": "Declined"})
            console.log("booking declined")

            setBooking({...booking, "bookingStatus": "Declined"})
        }
        catch(err) {
            console.log("cannot decline booking ", err)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textFieldHeading}>Vehicle Name: {vehicle.name}</Text>
            <Text>License: {vehicle.licensePlate}</Text>
            <Text>Price: {booking.price}</Text>
          
            <Text>Booking Date: {new Date(booking.bookingDate.seconds * 1000).toUTCString()}</Text>
            <Text>Booking Status: {booking.bookingStatus}</Text>

            {   
                booking.bookingConfirmationCode &&
                <Text>Booking Confirmation Code: {booking.bookingConfirmationCode}</Text>
            }

            {
                renter &&
                <View>
                    <Text>Renter: {renter.name}</Text>
                    <Image source = { {uri : renter.profilePicUrl}}  style={{ width: 100, height: 100 }} />
                </View>
                
            }

            {
                booking.bookingStatus.toLowerCase() == "pending" && 
                <View style={styles.btnContainer}>
                    <Pressable style={styles.acceptBtn} onPress={approveBooking}>
                        <Text style={styles.btnText}>Approve</Text>
                    </Pressable>

                    <Pressable style={styles.declineBtn} onPress={declineBooking}>
                        <Text style={styles.btnText}>Decline</Text>
                    </Pressable>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
            flexDirection: 'column',
            alignContent: 'center',
            alignSelf: 'center',
            width: '95%',
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
           elevation: 5
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 15
    },
    acceptBtn: {
        width: '40%',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10
    },
    declineBtn: {
        width: '40%',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        padding: 10,
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    textFieldHeading: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        paddingBottom: 10
    }
})

export default BookingDetailsScreen
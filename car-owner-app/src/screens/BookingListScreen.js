import { StyleSheet, Text, Button, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { collection, setDoc, doc, getDoc, getDocs, writeBatch, query } from "firebase/firestore";
import { useContext, useEffect, useState, useCallback } from "react"
import { auth, db } from "../../firebaseConfig"
import { NavigationOptionsContext } from "../providers/TabNavigationProvider"
import BookingListItems from "../components/BookingListItem";
import { useFocusEffect } from '@react-navigation/native';
import { BookingsContext } from '../providers/BookingsProvider';

const BookingListScreen = ({ navigation }) => {
    // const [isLoading, setIsLoading] = useState(true)
    // const [bookings, setBookings] = useState([])
    const { setTabSetOptions } = useContext(NavigationOptionsContext)
    const { isLoading, setIsLoading, bookings, setBookings } = useContext(BookingsContext)
    const [testCounter, setTestCounter] = useState(0)
    // const [isLoading, setIsLoading] = useState(true)
    // const [bookings, setBookings] = useState([])

    const fetchBookings = async () => {
        try {
            console.log("start fetching booking ")
            // setTabSetOptions(() => navigation.setOptions({headerTitle: "Changed"}))
            // navigation.setOptions({headerTitle: "iu"})
            // const query = query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`))
            const querySnapshot = await getDocs(query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`)))
            console.log("result is ", querySnapshot.docs)
            const getBookingsPromises = querySnapshot.docs.map(async (document) => {
                console.log("getting booking id ", document.data().bookingId)

                const bookingRef = document.data().bookingId
                const bookingDoc = await getDoc(bookingRef)
                console.log("bookingdoc ", bookingDoc.data())
                const vehicleRef = bookingDoc.data().vehicle
                console.log("vehicle ref ", vehicleRef)
                const vehicleDoc = await getDoc(vehicleRef)

                const renterRef = bookingDoc.data().renter
                const renterDoc = await getDoc(renterRef)
                // const renterData = renterDoc.data()
                
                console.log("renter doc is ", renterDoc.data())
                console.log("booking doc is ", bookingDoc.data())
                console.log("vehicle doc is ", vehicleDoc.data())
                console
                console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
                // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
                console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})
                // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
                console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})))
                return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}}
            })

            const result = await Promise.all(getBookingsPromises)
            console.log("bookings are ", result)
    
            setBookings(result)
            setIsLoading(false)
        }
        catch(err) {
            console.log("cannot fetch from fb: ", err)
            setIsLoading(false)
        }
    }

    useFocusEffect(
        // console.log("gain focus in bookings screen")
        // fetchBookings()
        useCallback(() => {
            console.log("focusing on book list")
            fetchBookings()
        }, [])
    )

    // const fetchBookings = useCallback(async () => {
    //     try {
    //         console.log("start fetching booking ", navigation, navigation.setOptions)
    //         // setTabSetOptions(() => navigation.setOptions({headerTitle: "Changed"}))
    //         // navigation.setOptions({headerTitle: "iu"})
    //         // const query = query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`))
    //         const querySnapshot = await getDocs(query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`)))
    //         console.log("result is ", querySnapshot.docs)
    //         const getBookingsPromises = querySnapshot.docs.map(async (document) => {
    //             console.log("getting booking id ", document.data().bookingId)

    //             const bookingRef = document.data().bookingId
    //             const bookingDoc = await getDoc(bookingRef)
    //             console.log("bookingdoc ", bookingDoc.data())
    //             const vehicleRef = bookingDoc.data().vehicle
    //             console.log("vehicle ref ", vehicleRef)
    //             const vehicleDoc = await getDoc(vehicleRef)

    //             const renterRef = bookingDoc.data().renter
    //             const renterDoc = await getDoc(renterRef)
    //             // const renterData = renterDoc.data()
                
    //             console.log("renter doc is ", renterDoc.data())
    //             console.log("booking doc is ", bookingDoc.data())
    //             console.log("vehicle doc is ", vehicleDoc.data())
    //             console
    //             console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
    //             // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
    //             console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})
    //             // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
    //             console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})))
    //             return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}}
    //         })

    //         const result = await Promise.all(getBookingsPromises)
    //         console.log("bookings are ", result)
    
    //         setBookings(result)
    //         setIsLoading(false)
    //     }
    //     catch(err) {
    //         console.log("cannot fetch from fb: ", err)
    //         setIsLoading(false)
    //     }
    // }, [])
    // useFocusEffect(() => {
    //     // fetchBookings()
    //     console.log("focus on bookings, ", fetchBookings)
    //     fetchBookings()

    // //    (async () => {
    // //         try {
    // //             console.log("start fetching booking ", navigation, navigation.setOptions)
    // //             // setTabSetOptions(() => navigation.setOptions({headerTitle: "Changed"}))
    // //             // navigation.setOptions({headerTitle: "iu"})
    // //             // const query = query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`))
    // //             const querySnapshot = await getDocs(query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`)))
    // //             console.log("result is ", querySnapshot.docs)
    // //             const getBookingsPromises = querySnapshot.docs.map(async (document) => {
    // //                 console.log("getting booking id ", document.data().bookingId)

    // //                 const bookingRef = document.data().bookingId
    // //                 const bookingDoc = await getDoc(bookingRef)
    // //                 console.log("bookingdoc ", bookingDoc.data())
    // //                 const vehicleRef = bookingDoc.data().vehicle
    // //                 console.log("vehicle ref ", vehicleRef)
    // //                 const vehicleDoc = await getDoc(vehicleRef)

    // //                 const renterRef = bookingDoc.data().renter
    // //                 const renterDoc = await getDoc(renterRef)
    // //                 // const renterData = renterDoc.data()
                    
    // //                 console.log("renter doc is ", renterDoc.data())
    // //                 console.log("booking doc is ", bookingDoc.data())
    // //                 console.log("vehicle doc is ", vehicleDoc.data())
    // //                 console
    // //                 console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
    // //                 // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
    // //                 console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})
    // //                 // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
    // //                 console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})))
    // //                 return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}}
    // //             })

    // //             const result = await Promise.all(getBookingsPromises)
    // //             console.log("bookings are ", result)
        
    // //             // setBookings(result)
    // //             // setIsLoading(false)
    // //         }
    // //         catch(err) {
    // //             console.log("cannot fetch from fb: ", err)
    // //         }
    // //     })()
    // })

    // const fetchBookings = async () => {
    //     try {
    //         console.log("start fetching booking ", navigation, navigation.setOptions)
    //         // setTabSetOptions(() => navigation.setOptions({headerTitle: "Changed"}))
    //         // navigation.setOptions({headerTitle: "iu"})
    //         // const query = query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`))
    //         const querySnapshot = await getDocs(query(collection(db, `/Car_Owners/${auth.currentUser.email}/bookings`)))
    //         console.log("result is ", querySnapshot.docs)
    //         const getBookingsPromises = querySnapshot.docs.map(async (document) => {
    //             console.log("getting booking id ", document.data().bookingId)

    //             const bookingRef = document.data().bookingId
    //             const bookingDoc = await getDoc(bookingRef)
    //             console.log("bookingdoc ", bookingDoc.data())
    //             const vehicleRef = bookingDoc.data().vehicle
    //             console.log("vehicle ref ", vehicleRef)
    //             const vehicleDoc = await getDoc(vehicleRef)

    //             const renterRef = bookingDoc.data().renter
    //             const renterDoc = await getDoc(renterRef)
    //             // const renterData = renterDoc.data()
                
    //             console.log("renter doc is ", renterDoc.data())
    //             console.log("booking doc is ", bookingDoc.data())
    //             console.log("vehicle doc is ", vehicleDoc.data())
    //             console
    //             console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
    //             // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
    //             console.log("before serial ", {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})
    //             // stringify and then parse the object to remove the non-serializable fields, which should not be passed through navigation
    //             console.log("after serial ", JSON.parse(JSON.stringify({"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}})))
    //             return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}, "renter": {"id": renterDoc.id, ...renterDoc.data()}}
    //         })

    //         const result = await Promise.all(getBookingsPromises)
    //         console.log("bookings are ", result)
    
    //         setBookings(result)
    //         // setIsLoading(false)
    //     }
    //     catch(err) {
    //         console.log("cannot fetch from fb: ", err)
    //         // setIsLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchBookings()
    // }, [])


    const updateBooking = (id, newBooking) => {
        console.log("updating booking")
        const indexToBeUpdated = bookings.findIndex((booking) => booking.id == id)
        bookings[indexToBeUpdated] = newBooking
        setBookings(bookings)
    }

    useContext(() => {
        console.log("context values in booking list are ", isLoading, bookings)
    }, [])

    return (
        // <NavigationOptionsContext.Provider value={{ tabSetOptions: navigation.setOptions }}>
        <View>
            {
                isLoading ? (
                    <ActivityIndicator color="blue" size="large" animating={true} style={styles.indicator}/>
                ) : (
                    bookings.length > 0 ?
                    <FlatList 
                        data={bookings}
                        key={(item) => item.booking.id}
                        renderItem={({item}) => 
                            <BookingListItem item={item} updateBooking={updateBooking}/>
                            // <BookingListItem item={item} />

                            // <Pressable onPress={() => navigation.navigate("BookingDetails", {booking: item})} >
                            // <Pressable onPress={() => navigation.navigate("BookingDetails", JSON.parse(JSON.stringify({booking: item.booking, vehicle: item.vehicle, renter: item.renter})))} >
                            //     {/* <Text style={{backgroundColor: "gray"}}>{item.name}</Text> */}
                            //     <Text style={{backgroundColor: "gray"}}>{item.vehicle.name}</Text>
                            // </Pressable>
                        }
                    />
                    :
                    <Text>No Bookings at this moment</Text>
                )
            }
        </View>
        // </NavigationOptionsContext.Provider>
    )
}

const styles = StyleSheet.create({
    indicator: {
        height: '100%'
    }
})


export default BookingListScreen
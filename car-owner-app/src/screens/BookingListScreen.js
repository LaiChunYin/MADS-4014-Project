import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { collection, setDoc, doc, getDoc, getDocs, writeBatch, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { auth, db } from "../../firebaseConfig"
import { NavigationOptionsContext } from "../providers/TabNavigationProvider"
import BookingListItems from "../components/BookingListItem";

const BookingListScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const { setTabSetOptions } = useContext(NavigationOptionsContext)

    useEffect(() => {
        // const result = await db.getDoc(doc(db, "Car_Owners", auth.currentUser.email))
       (async () => {
            try {
                console.log("start fetching booking ", navigation, navigation.setOptions)
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
            }
        })()
    }, [])

    const updateBooking = (id, newBooking) => {
        console.log("updating booking")
        const indexToBeUpdated = bookings.findIndex((booking) => booking.id == id)
        bookings[indexToBeUpdated] = newBooking
        setBookings(bookings)
    }
    return (
        // <NavigationOptionsContext.Provider value={{ tabSetOptions: navigation.setOptions }}>
        <View>
            {
                isLoading ? (
                    <ActivityIndicator color="blue" size="large" animating={true}/>
                ) : (
                    <FlatList 
                        data={bookings}
                        key={(item) => item.booking.id}
                        renderItem={({item}) => 
                            <BookingListItem item={item} />

                            // <Pressable onPress={() => navigation.navigate("BookingDetails", {booking: item})} >
                            // <Pressable onPress={() => navigation.navigate("BookingDetails", JSON.parse(JSON.stringify({booking: item.booking, vehicle: item.vehicle, renter: item.renter})))} >
                            //     {/* <Text style={{backgroundColor: "gray"}}>{item.name}</Text> */}
                            //     <Text style={{backgroundColor: "gray"}}>{item.vehicle.name}</Text>
                            // </Pressable>
                        }
                    />
                )
            }
        </View>
        // </NavigationOptionsContext.Provider>
    )
}

export default BookingListScreen
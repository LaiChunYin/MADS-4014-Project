import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { collection, setDoc, doc, getDoc, getDocs, writeBatch, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { auth, db } from "../../firebaseConfig"

const BookingListScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        // const result = await db.getDoc(doc(db, "Car_Owners", auth.currentUser.email))
       (async () => {
            try {
                console.log("start fetching booking")
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
                    
                    console.log("booking doc is ", bookingDoc.data())
                    console.log("vehicle doc is ", vehicleDoc.data())
                    console.log("booking ", { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()})
                    // return { "id": bookingDoc.id, ...bookingDoc.data(), ...vehicleDoc.data()}
                    return {"booking": {"id": bookingDoc.id, ...bookingDoc.data()}, "vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}}
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

    return (
        <View>
            {
                isLoading ? (
                    <ActivityIndicator color="blue" size="large" animating={true}/>
                ) : (
                    <FlatList 
                        data={bookings}
                        key={(item) => item.booking.id}
                        renderItem={({item}) => 
                            // <Pressable onPress={() => navigation.navigate("BookingDetails", {booking: item})} >
                            <Pressable onPress={() => navigation.navigate("BookingDetails", {booking: item.booking, vehicle: item.vehicle})} >
                                {/* <Text style={{backgroundColor: "gray"}}>{item.name}</Text> */}
                                <Text style={{backgroundColor: "gray"}}>{item.vehicle.name}</Text>
                            </Pressable>
                        }
                    />
                )
            }
        </View>
    )
}

export default BookingListScreen
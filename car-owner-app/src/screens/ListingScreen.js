import { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator, ScrollView } from "react-native"
import { db, auth } from "../../firebaseConfig"
import { collection, setDoc, doc, getDoc, getDocs, query, writeBatch } from "firebase/firestore";
import VehicleSuggestionList from "../components/VehicleSuggestionList";
import { useFocusEffect } from "@react-navigation/native"
import VehicleListItem from "../components/VehicleListItem";

const ListingScreen = () => {
    const [vehicles, setVehicles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    
    const fetchVehicles = async () => {
        try {
            console.log("start fetching vehicles ")

            const querySnapshot = await getDocs(query(collection(db, `/Car_Owners/${auth.currentUser.email}/Vehicles`)))
            console.log("result is ", querySnapshot.docs)
            const getVehiclesPromises = querySnapshot.docs.map(async (document) => {
                console.log("getting vehicle id ", document.data())

                const vehicleDoc = await getDoc(document.data().vehicleId)

                return {"vehicle": { "licensePlate": vehicleDoc.id, ...vehicleDoc.data()}}
            })

            let result = await Promise.all(getVehiclesPromises)
            // result.filter((car) => car !=== undefined)
            console.log("vehicles are ", result)
    
            setVehicles(result)
            setIsLoading(false)
        }
        catch(err) {
            console.log("cannot fetch from fb: ", err)
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.log("focusing on vehicles")
            fetchVehicles()
        }, [])
    )

    return (
        <ScrollView style={styles.container}>
            {   isLoading ?
                <ActivityIndicator color="blue" size="large" animating={true} style={styles.indicator}/>
                :
                vehicles.length > 0 ?
                <ScrollView horizontal={true}>
                    <View style={styles.listContainer}>
                        <FlatList 
                            data={vehicles}
                            key={(item) => item.licensePlate}
                            renderItem={({item}) => <VehicleListItem vehicle={item.vehicle} />}
                        />
                    </View>
                </ScrollView>
                :
                <Text>No Listing found</Text>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: 400
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 15
    },
    textFieldHeading: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginHorizontal: 12,
        paddingTop: 10
    },
    textField: {
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    saveButton: {
        width: '70%',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 80
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
    imageStyle: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
         width: '80%', 
         height: 200
    }
  });

export default ListingScreen
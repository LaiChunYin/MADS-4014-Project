import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { db, auth } from "../../firebaseConfig"
import { collection, setDoc, doc, getDoc, writeBatch } from "firebase/firestore";
import VehicleSuggestionListItem from "../components/VehicleSuggestionListItem";

const ListingScreen = () => {
    const [selectedVehicle, setSelectedVehicle] = useState({})
    const [filteredVehicles, setfilteredVehicles] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://laichunyin.github.io/MADS-4014-Project/vehicles.json").then((response) => {
            console.log("data from api is ", response, response.ok)
            if(response.ok) {
                return response.json()
            }
            else {
                throw "response failed"
            }
        })
        .then((data) => {
            data.forEach(element => {
                const vehicle = {
                    handle: element.handle,
                    name: `${element["make"]} ${element["model"]} ${element["trim"]}` ?? "",
                    photoUrl: element.images[0]["url_full"] ?? "",
                    capacity: String(element.seats_max) ?? "",
                    modelYear: String(element["model_year"]) ?? "",
                    make: element["make"] ?? "",
                }
                console.log("vehicle is ", vehicle)
                vehicles.push(vehicle)
            });

            setVehicles(vehicles)
        })
        .catch((err) => {
            console.log(`error when fetching ${err}`)
        })
        .finally(() => {setIsLoading(false)})
    }, [])

    const validateSelectedVehicle = () => {
        const requiredKeys = ["handle", "name", "photoUrl", "capacity", "modelYear", "make", "licensePlate", "location", "price"]
        const selectedVehicleKeys = Object.keys(selectedVehicle)

        requiredKeys.every(key => {
            if (!selectedVehicleKeys.includes(key)) return false
            if (selectedVehicle[key] === null || selectedVehicle[key] === undefined) return false
            if (typeof selectedVehicle[key] == "string" && selectedVehicle[key].length < 1) return false
        });
        print("valid vehicle")
        return true
    }

    const filterVechiles = (vehiclesName) => {
        let result = []
        const keywords = vehiclesName.split(" ")
        console.log("keywords are ", keywords)

        vehicles.forEach((car) => {
            if (keywords.some((substring) => car.name.includes(substring))) {
                console.log("including ", car.name)
                result.push(car)
            }
        })
        console.log("filter cars total: ", result.length)
        console.log("filtered car is ", result.slice(0, 10))
        setfilteredVehicles(result.slice(0, 10))
        // setfilteredVehicles(result)
    }

    const setVehicleProperty = (partialVehicle) => {
        console.log("selected and partial ", selectedVehicle, partialVehicle)
        const newVehicle = {...selectedVehicle, ...partialVehicle}
        console.log("new car ", newVehicle)
        setSelectedVehicle(newVehicle)
    }

    const onVehicleNameChange = (vehicleName) => {
        setVehicleProperty({"name": vehicleName})
        filterVechiles(vehicleName)
    }

    const createRentalListing = async () => {
        if(validateSelectedVehicle(selectedVehicle)) {

            try {
                const batch = writeBatch(db)
                const vehicleId = selectedVehicle.licensePlate
                console.log("vehicle id is ", vehicleId)
                const vehicleDocRef = doc(db, "Vehicles", vehicleId)
                const carOwnerDocRef = doc(db, "Car_Owners", auth.currentUser.email)
                console.log("auth email ", auth.currentUser.email)
                console.log("doc ref ", typeof carOwnerDocRef, carOwnerDocRef)

                batch.set(doc(db, "Vehicles", vehicleId), {...selectedVehicle, "owner": carOwnerDocRef})
                batch.set(doc(carOwnerDocRef, "Vehicles", vehicleId), {[selectedVehicle.licensePlate]: vehicleDocRef})

                console.log("before commit")
                await batch.commit()
                console.log("batch commited")
                setSelectedVehicle({})
            }
            catch(err) {
                console.log("cannot save listing: ", err)
            }

        }
        else {
            console.log("invalid data")
            alert("All fields should not be empty")
        }
    }

    return (
        <View>
            <Text>Vehicle Name: </Text>
            <TextInput
                placeholder = "Enter Vehicle Name"
                value = {selectedVehicle.name}
                // onChangeText = {value => setVehicleProperty({"name": value})}
                onChangeText = {onVehicleNameChange}
            />
            {
                filteredVehicles.length > 0 &&
                <VehicleSuggestionListItem filteredVehicles={filteredVehicles} setSelectedVehicle={setSelectedVehicle} />
            //     <FlatList
            //         // style={styles.animeList}
            //         data={filteredVehicles}
            //         key={ (item) => item.handle }
            //         renderItem={({item}) => 
            //             <Pressable onPress={() => selectVehicle(item)}>
            //                 <Text style={{backgroundColor: "yellow"}}>{item.name}</Text>
            //             </Pressable>
            //             // <Text >{item.name}</Text>
            //         } 
            //   />
            }

            <Text>Make: </Text>
            <TextInput
                placeholder = "Enter Vehicle Make"
                value = {selectedVehicle.make}
                onChangeText = {value => setVehicleProperty({"make": value})}
            />

            <Text>Model Year: </Text>
            <TextInput
                placeholder = "Enter Model Year"
                value = {selectedVehicle.modelYear}
                onChangeText = {value => setVehicleProperty({"modelYear": value})}
            />

            <Text>Capacity: </Text>
            <TextInput
                placeholder = "Enter Seat Capacity"
                value = {selectedVehicle.capacity}
                onChangeText = {value => setVehicleProperty({"capacity": value})}
            />
            
            <Text>License Plate: </Text>
            <TextInput
                placeholder = "Enter License Plate"
                // value = {licensePlate}
                value = {selectedVehicle.licensePlate}
                // onChangeText = {setlicensePlate}
                onChangeText = {value => setVehicleProperty({"licensePlate": value})}
            />

            <Text>Pick Up Location: </Text>
            <TextInput
                placeholder = "Choose Pick Up Location"
                // value = {location}
                value = {selectedVehicle.location}
                onChangeText = {value => setVehicleProperty({"location": value})}
            />

            <Text>Rental Price: </Text>
            <TextInput
                placeholder = "Enter Rental Price per week"
                // value = {price}
                value = {selectedVehicle.price}
                onChangeText = {value => setVehicleProperty({"price": value})}
            />

            {
                selectedVehicle.photoUrl?.length > 0  &&
                <Image source = { {uri : selectedVehicle.photoUrl}}  style={{ width: 100, height: 100 }} />
            }

            <Pressable onPress={createRentalListing}>
                <Text>Save</Text>
            </Pressable>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

export default ListingScreen
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"

export default VehicleSuggestionList = ({filteredVehicles, onPressVehicleSuggestion}) => {
    // const selectVehicle = (car) => {
    //     console.log("selecting car ", car)
    //     setSelectedVehicle(car)
    // }

    return (
        <FlatList
            // style={styles.animeList}
            data={filteredVehicles}
            key={ (item) => item.handle }
            style={
                styles.listContainer
            }
            renderItem={({item}) => 
                <Pressable onPress={() => onPressVehicleSuggestion(item)}>
                    <Text style={{backgroundColor: "yellow"}}>{item.name}</Text>
                </Pressable>
                // <Text >{item.name}</Text>
            } 
        />
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    listContainer: {
        marginHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 8,
        backgroundColor: "lightgreen",
    }
});
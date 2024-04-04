import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"

export default VehicleSuggestionList = ({filteredVehicles, onPressVehicleSuggestion}) => {
    return (
        // <View  style={styles.testing}>
        <FlatList
            data={filteredVehicles}
            key={ (item) => item.handle }
            style={
                styles.listContainer
            }
            renderItem={({item}) => 
                <Pressable style={styles.listContainer} onPress={() => onPressVehicleSuggestion(item)}>
                    {/* <Text style={styles.listItem}>{item.name}</Text> */}
                    <Text>{item.name}</Text>
                </Pressable>
                // <Text >{item.name}</Text>
            } 
            ItemSeparatorComponent={<View style={{height: 1, backgroundColor: 'gray', marginVertical: 10}} />}
        />
        // </View>
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
        paddingVertical: 4,
        backgroundColor: "lightgreen",
    }
});
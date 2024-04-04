import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default BookingListItem = ({item}) => {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate("BookingDetails", JSON.parse(JSON.stringify(item)))} >
            {/* <Text style={{backgroundColor: "gray"}}>{item.name}</Text> */}
            {/* <Text style={{backgroundColor: "gray"}}>{item.vehicle.name}</Text> */}
         <View style={styles.listItem}>
            <Text style={styles.title}>{item.vehicle.name} </Text>
       </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
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
       elevation: 5,
     },
     title: {
        fontSize: 15,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',
      },
})

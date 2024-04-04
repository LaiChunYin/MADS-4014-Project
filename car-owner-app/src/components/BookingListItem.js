import { StyleSheet, Text, Pressable, View, Image } from "react-native"
import { useEffect } from "react"
import { useNavigation } from '@react-navigation/native';

export default BookingListItem = ({item}) => {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate("BookingDetails", {...JSON.parse(JSON.stringify(item))})} >
            <View style={styles.listItem}>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.title}>{item.vehicle.name} </Text>
                    <Text>{item.booking.bookingStatus}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text>By {item.renter.name} </Text>
                    <Image source = { {uri : item.renter.profilePicUrl}}  style={{ width: 40, height: 40 }} />
                </View>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        justifyContent: "space-between",
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
      horizontalContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }
})

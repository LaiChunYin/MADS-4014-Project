import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator, Button } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingDetailsScreen from './BookingDetailsScreen';
import BookingListScreen from './BookingListScreen';
import { useEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/elements'

const Stack = createNativeStackNavigator()

const BookingsScreen = ({ navigation }) => {
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //         <HeaderBackButton onPress={() => navigation.goBack()} />
    //         ),
    //     })
    // }, [navigation])

    useEffect(() => {
        console.log("in bookingscreen ", navigation.getState().routes[navigation.getState().index].name, navigation.getState().index)
    })

    return (
        // <NavigationContainer>
            <Stack.Navigator initialRouteName='BookingList' 
            screenOptions={ {headerStyle: {backgroundColor: 'orangered'}, 
            headerTintColor: '#fff', 
            headerTitleStyle: {fontWeight: 'bold'}, } 
            }>
                <Stack.Screen name="BookingList" component={BookingListScreen} options={{ headerShown: false }} />
                <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} tabNavigation={navigation}
                    // options={{ headerShown: false, headerLeft: () => <Button onPress={ navigation.goBack() } title={"Go Back"} /> }} 
                    options={{ headerShown: true}} 
                />
            </Stack.Navigator>

        // </NavigationContainer>
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

export default BookingsScreen
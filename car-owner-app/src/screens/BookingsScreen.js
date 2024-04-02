import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View, FlatList, Image, ActivityIndicator, Button } from "react-native"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingDetailsScreen from './BookingDetailsScreen';
import BookingListScreen from './BookingListScreen';
import { useEffect, useContext } from 'react';
import { NavigationOptionsProvider, NavigationOptionsContext  } from "../providers/TabNavigationProvider"
import { HeaderBackButton } from '@react-navigation/elements'
import BookingsNavigation from '../navigation/BookingsNavigation';

const Stack = createNativeStackNavigator()

const BookingsScreen = () => {
    const navigation = useNavigation()
    const { tabSetOptions, setTabSetOptions } = useContext(NavigationOptionsContext)

    useEffect(() => {
        console.log("in bookingscreen ", navigation.getState(), navigation.getState().routes[navigation.getState().index].name, navigation.getState().index)
        console.log("in booking screen: ", navigation, navigation.setOptions)
        setTabSetOptions(() => navigation.setOptions)
    }, [])

    return (
        <BookingsNavigation />

        // <NavigationContainer>
            // <Stack.Navigator initialRouteName='BookingList' 
            // screenOptions={ {headerStyle: {backgroundColor: 'orangered'}, 
            // headerTintColor: '#fff', 
            // headerTitleStyle: {fontWeight: 'bold'}, } 
            // }>
            //     <Stack.Screen name="BookingList" component={BookingListScreen} options={{ headerShown: false }} />
            //     <Stack.Screen name="BookingDetails" component={BookingDetailsScreen}
            //         // options={{ headerShown: true, headerLeft: () => <Button onPress={ () => navigation.goBack() } title={"Go Back"} /> }} 
            //         options={{ headerShown: false}} 
            //     />
            // </Stack.Navigator>

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
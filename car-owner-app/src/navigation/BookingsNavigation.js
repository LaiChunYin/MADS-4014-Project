import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import BookingListScreen from '../screens/BookingListScreen';

const Stack = createNativeStackNavigator()

export default BookingsNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='BookingList' 
        screenOptions={ {headerStyle: {backgroundColor: 'orangered'}, 
        headerTintColor: '#fff', 
        headerTitleStyle: {fontWeight: 'bold'}, } 
        }>
            <Stack.Screen name="BookingList" component={BookingListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen}
                // options={{ headerShown: true, headerLeft: () => <Button onPress={ () => navigation.goBack() } title={"Go Back"} /> }} 
                options={{ headerShown: false}} 
            />
        </Stack.Navigator>
    )
}
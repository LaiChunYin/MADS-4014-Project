import { useState } from "react"
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native"
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

const SignInScreen = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const signIn = async () => {
        try {
            const docRef = doc(db, "Car_Owners", username)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log("is car owner")
                await signInWithEmailAndPassword(auth, username, password)
                console.log("signin success: ", auth.currentUser)
            }
            else {
                console.log("not a car owner")
                alert("Invalid credentials")
            }

        }
        catch(err) {
            console.log("sign in error: ", err)
            alert("Sign in failed")
        }

    }

    return (
        <View style={styles.container}>
            <Text>Car Owner App - Sign In</Text>

            <Text>Username: </Text>
            <TextInput
                placeholder = "Enter User Name"
                value = {username}
                onChangeText = {setUserName}
            />

            <Text>Password: </Text>
            <TextInput
                placeholder = "Enter Password"
                value = {password}
                onChangeText = {setPassword}
            />

            <Pressable onPress={signIn}>
                <Text>Sign In</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SignInScreen
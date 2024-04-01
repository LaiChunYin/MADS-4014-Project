const SignUpScreen = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const createAccount = () => {
        print("creating account")
    }

    return (
        <View>
        <Text>Car Owner App - Sign Up</Text>

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

        <Pressable onPress={createAccount}>
            <Text>Sign Up</Text>
        </Pressable>
    </View>
    )
}
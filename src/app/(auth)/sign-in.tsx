import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'

const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    
    return (
        <View style={styles.container}>
        <Stack.Screen options={{ title: "Sign-In"}}/>
        <Image 
            source={require("assets/images/food.jpg")}
            style={styles.image}
            resizeMode='contain'
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
            value={email}
            placeholder='john@gmail.com'
            style={styles.input}
            onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
            value={password}
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
        />
        <Button text='Sign In'/>
        
        <Link href="/(auth)/sign-up" style={styles.textButton}>
            Create an Account
        </Link>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    image:{
        width: "50%",
        alignSelf:"center",
        padding: 10
    },
    label: {
        // color: "gray"
    },
    input:{
        color: "gray",
        backgroundColor: "white",
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20
    },
    textButton: {
        color: Colors.light.tint,
        alignSelf: "center",
        fontWeight: "bold"
    }
})
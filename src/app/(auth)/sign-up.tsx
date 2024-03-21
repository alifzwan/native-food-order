import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'

const SignUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const signUpwithEmail = async () => {
        setLoading(true)
        
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign-Up"}}/>
            
            <Image 
                source={require("assets/images/upm.png")}
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
                placeholder=''
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button
                onPress={signUpwithEmail}
                disabled={loading}
                text={loading ? 'Creating account...' : "Create account"} 
            />
            
            <Link href="/sign-in" style={styles.textButton}>
                Sign In
            </Link>
        </View>
    )
}

export default SignUpScreen

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
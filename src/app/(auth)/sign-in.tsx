import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import Button from '@/components/mainComponents/Button'

const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const signInwithEmail = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }
    
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign-In"}}/>
            
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
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button 
                onPress={signInwithEmail}
                disabled={loading}
                text={loading ? 'Signing in...' : 'Sign in'}/>
            
            <Link href="/sign-up" style={styles.textButton}>
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
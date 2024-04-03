import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import Button from '@/components/mainComponents/Button'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SignUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign-Up", headerShown: false}}/>
            
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
            <View style={styles.password}>
                <TextInput 
                    value={password}
                    style={styles.input}
                    placeholder='Password:'
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                />
                <MaterialCommunityIcons
                    name= {showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color= '#aaa'
                    style={styles.icon}
                    onPress={toggleShowPassword}
                />
            </View>
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
    container: {
        padding: 55
    },

    image: {
        width: "50%",
        alignSelf:"center",
        padding: 10
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        color: "gray",
        backgroundColor: "white",
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    textButton: {
        color: Colors.light.tint,
        alignSelf: "center",
        fontWeight: "bold"
    },
    password: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputPassword: {
        flex: 1,
        color: 'gray',
        backgroundColor: 'white',
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        
    },
    icon : {
        marginLeft: 10
    }
})
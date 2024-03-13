import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { defaultPizzaImage } from '@/components/productlistitem/ProductListItem'
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState("")
    const [image, setImage] = useState<string | null>(null)


    const validateInput = () => {
        setErrors('');
        if (!name){
            setErrors("Name Is Required")
            return false
        }
        if (!price) {
            setErrors("Price Is Required")
            return false
        } 
        if (isNaN(parseFloat(price))){ 
            setErrors("Price should be a number")
            return false
        }
        return true
    }

    const onCreate = () => {
        if(!validateInput()){
            return
        }
        console.warn("Creating product: ", name)
        setName("")
        setPrice("")
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Create Product"}}/>

            <Image 
                source={{uri: image || defaultPizzaImage}}  
                style={styles.image}
                resizeMode='contain'
            />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput 
                value={name}
                placeholder='Margarita'
                placeholderTextColor="gray"
                style={styles.input}
                onChangeText={setName}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                value={price}
                placeholder='9.99'
                placeholderTextColor="gray"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setPrice}

            />
            <Text style={styles.error}>{errors}</Text>
            <Button onPress={onCreate} title='Create' />
        </View>
    )
}

export default CreateProductScreen


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label: {
        color: 'gray'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    }
})
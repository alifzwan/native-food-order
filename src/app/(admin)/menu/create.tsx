import { View, Text, StyleSheet, Image, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors'
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { defaultPizzaImage } from '@/components/mainComponents/ProductListItem';
import { useInsertProduct } from '@/api/products';

const CreateProductScreen = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState("")
    const [image, setImage] = useState<string | null>(null)


    const { id } = useLocalSearchParams() // Getting the id of the product
    const isUpdating = !!id; // Updating === true if id is defined

    const { mutate: insertProduct } = useInsertProduct()



    const resetFields = () => {
        setName('')
        setPrice('')
    }



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
        console.warn('Creating product:', name)
        insertProduct(
            { name, price: parseFloat(price), image },
            {
                onSuccess: () => { // This function will be called if the mutation is executed successfully
                    resetFields()
                    router.back()
                }
            }
        )
    }


    const onUpdateCreate = () => {
        if(!validateInput()){
            return
        }
        console.warn("Updating product: ")
        setName("")
        setPrice("")
    }

    const onSubmit = () => {
        if(isUpdating){
            onUpdateCreate()
        } else {
            onCreate()
        }
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
    }
    

    const onDelete = () => {
        console.warn("Deleting...");
        
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete thsi product", [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style:"destructive",
                onPress: onDelete,
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? "Update Product" : "Create Product"}}/>

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

            <Text style={styles.label}>Price (RM)</Text>
            <TextInput 
                value={price}
                placeholder='9.99'
                placeholderTextColor="gray"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setPrice}

            />
            <Text style={styles.error}>{errors}</Text>
            <Button onPress={onSubmit} title={isUpdating ? 'Updating' : 'Create'} />

            {isUpdating && 
                <Text 
                    style={styles.textButton}
                    onPress={confirmDelete}
                >
                    Delete
                </Text>
            }
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
       
        // color: 'gray'
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
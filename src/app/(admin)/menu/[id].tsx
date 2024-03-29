
import React from 'react'
import { Link, Stack, useLocalSearchParams} from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProductByID } from '@/api/products'
import { defaultPizzaImage } from '@/components/mainComponents/ProductListItem'

const ProductDetailScreen = () => {

  const { id: idString } = useLocalSearchParams(); // To read the path parameter inside the Product details screen 
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])                 
  const {data: products, error, isLoading} = useProductByID(id)


  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !products) { //if the product not found
    return <Text>Failed to fetch the products</Text>
  }
  

  return (
      <View style={styles.container}> 
        <Stack.Screen 
          options={{ title: "Menu", 
            headerRight: () => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

      
        <Stack.Screen options={{ title: products.name }}/>

        <Image 
          source={{ uri: products.image || defaultPizzaImage }} 
          style={styles.image}
        />

        
        <Text style={styles.title}>{products.name}</Text>
        <Text style={styles.price}>RM{products.price}</Text>

      </View>
    )
  }





  const styles = StyleSheet.create({
    container:{
      backgroundColor: "white",
      flex: 1,
      padding: 10,
      alignItems:"center"
    },
    image:{
      width: "100%",
      aspectRatio: 1,
    },
    title: {
      justifyContent:"center",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 20
    },
    price:{
      fontSize: 18,
      fontWeight: "bold",
    },

  })

export default ProductDetailScreen
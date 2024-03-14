
import React, { useState } from 'react'
import products from '@assets/data/products'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { defaultPizzaImage } from '@/components/productlistitem/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]  // Array of Sizes

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams(); // To read the path parameter inside the Product details screen 
                                         
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const { addItem } = useCart()

  const router = useRouter()
  
  
  const product = products.find(
    (item) => item.id.toString() == id
  )

  const addToCart = () => {
    
    if(!product){
      return  
    }
    addItem(product, selectedSize)
    console.warn("Item Added")
    router.push("/cart")

  }

  

  if (!product) {  //if the product not found
    return <Text>Product Not Found</Text>
  }

  return (
      <View style={styles.container}> 

        <Stack.Screen 
          // name="[id]" 
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

      
        <Stack.Screen options={{ title: product.name }}/>

        <Image 
          source={{ uri: product.image || defaultPizzaImage }} 
          style={styles.image}
        />

        
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>

      </View>
    )
  }





  const styles = StyleSheet.create({
    container:{
      backgroundColor: "white",
      flex: 1,
      padding: 10,
    },
    image:{
      width: "100%",
      aspectRatio: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    price:{
      fontSize: 18,
      fontWeight: "bold",
    },

  })

export default ProductDetailScreen
import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const ProductDetailScreen = () => {
  
  const { id } = useLocalSearchParams(); // To read the path parameter inside
                                         // inside the Product detals screen using
  return (
      <View>
        <Stack.Screen options={{title: "Details: " + id}}/>
        <Text style={{fontSize: 20}}>Product Detail Screen: for id {id} </Text>
      </View>
    )
  }

export default ProductDetailScreen
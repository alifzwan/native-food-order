import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { OrderItem } from '@/types'
import Colors from '@/constants/Colors'
import { defaultPizzaImage } from './ProductListItem'


type OrderItemListItemprops ={
    item: OrderItem
}

const OrderItemListItem = ({ item }: OrderItemListItemprops) => {
  return (
    <View style={styles.container}>
        <Image 
            source={{
                uri: item.products.image || defaultPizzaImage
            }}
            style={styles.image}
            resizeMode='contain'
        />
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.products.name}</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.price}>$
                    {item.products.price.toFixed(2)}
                </Text>
                <Text>Size: {item.size}</Text>
            </View>
        </View>
        <View style={styles.quantitySelector}>
            <Text style={styles.quantity}>{item.quantity}</Text>
        </View>

    </View>
  )
}

export default OrderItemListItem
const styles = StyleSheet.create({
    container:{
        padding: 10,
        flexDirection: "row",
        flex: 1,
        backgroundColor: "white",
        borderColor: "white",
        borderRadius: 10,
        alignItems: "center"
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf:"center",
        marginRight: 10,
    },
    title: {    
        fontWeight: "bold"
    },
    subtitleContainer:{
        flexDirection: "row",
        gap: 5
    },
    price:{
        color: Colors.light.tint,
        fontWeight: "bold",
        
    },
    quantitySelector:{
        flexDirection:"row",
        gap: 10,
        alignItems: "center",
    },
    quantity: {
        fontWeight: "500",
        fontSize: 18
    }
})
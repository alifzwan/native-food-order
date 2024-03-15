import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'

const OrderDetailScreen = () => {
    const { id }= useLocalSearchParams()

    const order = orders.find(
        (o) => o.id.toString() === id
    )

    if(!order){
        <Text>Order not Found</Text>
    }
       

    return (
        <View>
            <Stack.Screen options={{ title: `Order #${ order.id }`}}/>
            <OrderListItem order={order}/>
            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
            />
        </View>
   
    )
}

export default OrderDetailScreen
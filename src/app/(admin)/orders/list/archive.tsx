import { View, Text, FlatList } from 'react-native'
import React from 'react'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/mainComponents/OrderListItem'

const OrderScreen = () => {
  return (
    <FlatList 
        data={orders} 
        contentContainerStyle={{ gap:10, padding: 10 }}
        renderItem={({item}) => (
            <OrderListItem order={item}/>
        )} 
    />
    
  )
}

export default OrderScreen
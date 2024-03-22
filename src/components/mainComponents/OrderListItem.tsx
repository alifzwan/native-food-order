import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Order } from '@/types'
import { Link, useSegments } from 'expo-router'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type OrderListItemProps = {
    order: Order
}

const OrderListItem = ({ order }: OrderListItemProps) => {
    const segments = useSegments()

    return (
        <Link href={`${segments[0]}/orders/${order.id}`} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.title}>Order #{order.id}</Text>
                    <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
                </View>
                <Text style={styles.status}>{order.status}</Text>
            </Pressable>
        </Link>
    )
}

export default OrderListItem

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor:"white",
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    time: {
        color: "gray"
    },
    status: {
        fontWeight:"bold"
    }
})
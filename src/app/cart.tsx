import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { CartContext, useCart } from '@/provider/CartProvider';

import React from 'react'
import CartListItem from '@/components/CartListItem';

const CartScreen = () => {

  const { items } = useCart()

  return (
    <View>
      <FlatList 
        data={items} 
        renderItem={({item}) => <CartListItem cartItem={item}/>} 
        contentContainerStyle={{padding: 10, gap: 10}}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

    </View>
  )
}

export default CartScreen

/*  
*     React Context

*   - The data about the items in the cart will be needed in the
*     multiple parts of the applications.
      
*   - For example, we will add items to the cart from the Product Details page,
*     and will display them on the Product Details page

*   - That is already something that cannot easily be accomplished with simple useState()


*    Steps:

*    - Define a simple Context provider (/CartProvider.tsx)
*    -
*    -
*    -



      

*/

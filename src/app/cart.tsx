import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/provider/CartProvider';

import React from 'react'
import Button from '@/components/mainComponents/Button';
import CartListItem from '@/components/mainComponents/CartListItem';

const CartScreen = () => {

  const { items, total } = useCart()  //*    Because we combine useContext(CartContext) into useCart() 
                                      //*  - export const useCart = () => useContext(CartContext)

  return (
    <View style={{ padding: 10 }}>

        <FlatList 
          data={ items } 
          renderItem={({ item }) => <CartListItem cartItem={ item }/>} 
          contentContainerStyle={{ gap: 10 }}
        />

        <Text style={{ marginTop:10, fontSize:20, fontWeight: "500"}}>
          Total: ${total}
        </Text>

        <Button text='Checkout'/>

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

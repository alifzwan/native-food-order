import React from 'react'
import { Stack } from 'expo-router'

const MenuStack = () => {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title: "Menu"}}/>
  </Stack>
  )
}

export default MenuStack

/* React Navigation
  
  Notes: https://reactnavigation.org/docs/hello-react-navigation

  - In web


*/


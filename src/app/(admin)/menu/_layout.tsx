import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'

const MenuStack = () => {
  return (
  <Stack>
    <Stack.Screen 
      name="index" 
      options={{ title: "Menu", 
        headerRight: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="plus-square-o"
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



    <Stack.Screen 
      name="[id]" 
      options={{ title: "Menu", 
        headerRight: () => (
          <Link href="/" asChild>
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
  </Stack>
  )
}

export default MenuStack

/* React Navigation
  
  Notes: https://reactnavigation.org/docs/hello-react-navigation

  - In web


*/


import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {

        const { data, error } = await supabase
        .from('products') // Table Name 
        .select("*")      // Select column


        //If there's an error
        if (error) {
            throw new Error(error.message)
        }
        return data      
    }
  })
}


 

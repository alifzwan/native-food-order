import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// We'll gonna utilise Custom Hook



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

/* 
    * READ PRODUCT BY ID
    * - Fetching the data of the product on supabase
*/
export const useProduct = ( id: number ) => {
    return useQuery({
        queryKey:['products'],
        queryFn: async () => {
            const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        //If there's an error
        if (error) {
            throw new Error(error.message)
        }
        return data    
        }
    })
}


 

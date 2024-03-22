import { View, Text } from 'react-native'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// We'll gonna utilise Custom Hook



export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {

        const { data, error } = await supabase
            .from('products') // Table Name 
            .select("*")      // Select column

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
export const useProductByID = ( id: number ) => {
    return useQuery({
        queryKey:['products', id],

        queryFn: async () => {
            const { data, error } = await supabase
                .from('products') // Table Name 
                .select('*')      // Select column
                .eq('id', id)     // filter the column
                .single()         

            //If there's an error
            if (error) {
                throw new Error(error.message)
            }
            return data    
        }
    })
}

/* 
    * CREATE A PRODUCT
    * - Admin can create product and save it in the database
    * Mutation = Creation
*/  
export const useInsertProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: any) { // Variables that'll be send to the database
            const { error, data: newProduct} = await supabase
                .from('products')
                .insert({
                    name: data.name,
                    price: data.price,
                    image: data.image
                })
                .single()

            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        },

        async onSuccess() { // This function is executed when mutation is successful
            await queryClient.invalidateQueries(['products'])
        },

        onError(error){
            console.log(error)
        }
    })
}


 

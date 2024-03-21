import { View, FlatList} from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@/components/productlistitem/ProductListItem';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';


export default function MenuScreen() {
  useEffect(() => {

    const fetchProducts = async () =>  {
      const { data, error } = await supabase
      .from('products') // Table name
      .select('*')      // Select column
    }
    
    fetchProducts()
   
  },[])

  return (
      <FlatList 
        data={products} 
        renderItem={({ item }) => (
          <ProductListItem product={item} />
        )}
        numColumns={2}
        contentContainerStyle={{ gap:10, padding: 10 }}
        columnWrapperStyle={{ gap:10 }}
      />
  );
}

/* 
*    FLATLIST

*   - Flatlist helps us render an infinite scrollable lists


*   Properties required in Flatlist:

*   - data={n}       => n is array of item.
*   - renderItem={}  => function that tells Flatlist how should single item
*                       from our array be rendered.

 *  Other properties:
 *  -  numColumns =>  display our item in multiple columns
 *  -  contentContainerStyle => style that supplied to all container
                      
*/                     

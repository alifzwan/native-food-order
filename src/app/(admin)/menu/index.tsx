import { View, FlatList, ActivityIndicator, Text} from 'react-native';
import ProductListItem from '@/components/productlistitem/ProductListItem';
import { useProductList } from '@/api/products';


export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList()

  if (isLoading){
    return <ActivityIndicator />
  }

  if (error){
    return <Text>Failed to fetch the products</Text>
  }
  
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

import { View, FlatList} from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@/components/productlistitem/ProductListItem';


export default function MenuScreen() {
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

/* FLATLIST

 - Flatlist helps us render an infinite scrollable lists


 * Properties required in Flatlist:

 - data={n}       // n - array of item.
 - renderItem={}  // function that tells Flatlist how should single item
                     from our array be rendered.

 * Other properties:
 -  numColumns -  display our item in multiple columns
 -  contentContainerStyle - style that supplied to all container
                      
*/                     

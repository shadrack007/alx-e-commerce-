import { FlatList, Text, View } from "react-native";

import { useGetProductsQuery } from "@/redux/services/fakeStoreApi";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) return <Text>Error</Text>;

  console.log(products?.length);

  return (
    <View className="h-full w-full">
      <View className="flex-1 gap-1">
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem {...item} />}
        />
      </View>
    </View>
  );
};

export default ProductList;

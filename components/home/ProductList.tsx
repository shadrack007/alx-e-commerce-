import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Product } from "@/interfaces";
import { useGetProductsQuery } from "@/redux/services/fakeStoreApi";
import ProductItem from "./ProductItem";

// page items limit
const LIMIT = 10;

const ProductList = () => {
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<Product[]>([]);

  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useGetProductsQuery({
    offset,
    limit: LIMIT,
  });

  // Append new products when data changes
  useEffect(() => {
    if (products && products.length > 0) {
      setItems((prev) => [...prev, ...products]);
    }
  }, [products]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductItem {...item} />,
    []
  );

  if (isLoading && offset === 0) {
    return <Text>Loading</Text>;
  }

  if (error) return <Text>Error loading products</Text>;

  const loadMore = () => {
    if (!isFetching) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  return (
    <View className="h-full w-full">
      <View className="flex-1 gap-1">
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? (
              <Text className="text-center">Loading more...</Text>
            ) : null
          }
          // Performance optimizations
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          updateCellsBatchingPeriod={50}
        />
      </View>
    </View>
  );
};

export default ProductList;

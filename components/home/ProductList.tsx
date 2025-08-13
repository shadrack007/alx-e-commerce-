import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants";
import { Product } from "@/interfaces";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/services/fakeStoreApi";
import { ScrollView } from "react-native-gesture-handler";
import ProductItem from "./ProductItem";

// page items limit
const LIMIT = 10;

const ProductList = () => {
  const [offset, setOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoryLoadingError,
  } = useGetCategoriesQuery();

  // Append new products when data changes
  useEffect(() => {
    if (products && products.length > 0) {
      setItems((prev) => [...prev, ...products]);
    }
  }, [products]);

  if (isLoading && offset === 0) {
    return (
      <View className="justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error)
    return <Text className="text-red-500 text-lg">Error loading products</Text>;

  if (categoriesLoading) return <Text className="text-lg">Loading...</Text>;

  if (categoryLoadingError)
    return (
      <Text className="text-red-500 text-lg">Error loading categories</Text>
    );

  const loadMore = () => {
    if (!isFetching) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  const onCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <View className="h-full w-full">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
        }}
        className="px-4 py-8"
      >
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className={`${selectedCategory === "All" ? "bg-primary rounded-lg p-3" : "bg-gray-200 rounded-lg p-3"}`}
            onPress={() => onCategory("All")}
          >
            <Text
              className={`${selectedCategory === "All"} ? "text-white": "text-black`}
            >
              All
            </Text>
          </TouchableOpacity>

          <View className="flex-row gap-3">
            {categories?.map((cat, index: number) => (
              <TouchableOpacity
                onPress={() => onCategory(cat.name)}
                key={index}
                className={`${selectedCategory === cat.name ? "bg-primary rounded-lg p-3" : "bg-gray-200 rounded-lg p-3"}`}
              >
                <Text
                  className={`${selectedCategory === cat.name} ? "text-white": "text-black`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="flex-1 gap-1">
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem {...item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? (
              <Text className="text-center">Loading more...</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default ProductList;

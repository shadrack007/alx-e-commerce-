import { Category } from "@/interfaces";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from "@/redux/services/fakeStoreApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Auto select the first category id
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id.toString());
    }
  }, [categories, selectedCategory]);

  // Fetch products based on the category
  const {
    data: items,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByCategoryIdQuery(
    selectedCategory ? { id: selectedCategory } : skipToken
  );

  // Categories loading/error/empty states
  if (catLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="mt-2">Loading categories...</Text>
      </View>
    );

  if (catError)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading categories</Text>
      </View>
    );

  if (!categories || categories.length === 0)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No categories found</Text>
      </View>
    );

  return (
    <SafeAreaView className="h-full w-full">
      {/* Categories Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        className="px-4 py-8"
      >
        <View className="flex-row items-center gap-3">
          {categories.map((cat: Category) => (
            <TouchableOpacity
              key={cat.id}
              className={
                selectedCategory === cat.id.toString()
                  ? "bg-primary rounded-lg p-3"
                  : "bg-gray-200 rounded-lg p-3"
              }
              onPress={() => setSelectedCategory(cat.id.toString())}
            >
              <Text
                className={
                  selectedCategory === cat.id.toString()
                    ? "text-white"
                    : "text-black"
                }
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Products Grid */}
      <View className="flex-1 gap-1 px-4">
        {productsLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="mt-2">Loading products...</Text>
          </View>
        ) : productsError ? (
          <View className="flex-1 justify-center items-center">
            <Text>Error loading products</Text>
          </View>
        ) : !items || items.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text>No products found</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductItem {...item} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

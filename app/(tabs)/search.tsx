import { useGetFilteredProductsQuery } from "@/redux/services/fakeStoreApi";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [filters, setFilters] = useState<any>(null);

  const {
    data: products,
    isLoading,
    error,
  } = useGetFilteredProductsQuery(filters, {
    skip: !filters, // skip until user searches
  });

  const handleSearch = () => {
    const params: any = {};
    if (title) params.title = title;
    if (priceMin) params.price_min = priceMin;
    if (priceMax) params.price_max = priceMax;
    if (categoryId) params.categoryId = categoryId;
    setFilters(params);
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <TextInput
        className="py-4 px-2 rounded-md border-2 focus:border-primary"
        placeholder="Search by title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Min Price"
        value={priceMin}
        onChangeText={setPriceMin}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Max Price"
        value={priceMax}
        onChangeText={setPriceMax}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Category ID"
        value={categoryId}
        onChangeText={setCategoryId}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <TouchableOpacity>
        <Text className="text-white font-bold ">Search</Text>
      </TouchableOpacity>

      <Button title="Search" onPress={handleSearch} />

      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading products</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

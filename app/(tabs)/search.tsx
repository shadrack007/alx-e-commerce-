import PrimaryButton from "@/components/common/PrimaryButton";
import SearchField from "@/components/common/TextInput";
import ProductItem from "@/components/home/ProductItem";
import { useGetFilteredProductsQuery } from "@/redux/services/fakeStoreApi";
import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
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

    setFilters(params);
  };

  return (
    <SafeAreaView className="flex-1 p-4 gap-4">
      <SearchField
        value={title}
        onChangeText={setTitle}
        placeholder="Search By Title.."
      />

      <SearchField
        value={priceMin}
        onChangeText={setPriceMin}
        keyboardType="numeric"
        placeholder="Min Price"
      />
      <SearchField
        value={priceMin}
        onChangeText={setPriceMax}
        keyboardType="numeric"
        placeholder="Max Price"
      />

      <PrimaryButton disabled={false} text="Search" onPress={handleSearch} />

      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading products</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem {...item} />}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

import { ActivityIndicator, Text, View } from "react-native";

import { useGetCategoriesQuery } from "@/redux/services/fakeStoreApi";

const CategorySection = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text>Failed to load categories</Text>;

  return (
    <View>
      <Text>CategorySection</Text>
    </View>
  );
};

export default CategorySection;

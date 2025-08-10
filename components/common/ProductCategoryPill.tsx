import { Text, View } from "react-native";

const ProductCategoryPill: React.FC<{ category: string }> = ({ category }) => {
  return (
    <View className="bg-primary rounded-full p-2">
      <Text className="text-white">{category}</Text>
    </View>
  );
};

export default ProductCategoryPill;

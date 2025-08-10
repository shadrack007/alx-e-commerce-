import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Product } from "@/interfaces";
import ProductCategoryPill from "../common/ProductCategoryPill";

const ProductItem = (item: Product) => {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const goToProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={() => goToProduct(item.id)}
      className="flex-1 m-1 border border-gray-300 rounded-lg"
    >
      <Image
        source={
          imgError
            ? require("@/assets/images/icon.png")
            : { uri: item.images[0] }
        }
        className="w-[100%] h-[150px]"
        resizeMode="cover"
        onError={() => setImgError(true)}
      />
      <View className="py-2 px-1 gap-3">
        <Text className="text-xl font-semibold">{item.title}</Text>
        <View className="flex-row justify-between items-center">
          <ProductCategoryPill category={item.category.name} />
          <Text className="font-bold text-primary text-lg">${item.price}</Text>
        </View>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

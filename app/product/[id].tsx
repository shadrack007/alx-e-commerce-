import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ProductCategoryPill from "@/components/common/ProductCategoryPill";
import { COLORS } from "@/constants";
import { useGetProductByIdQuery } from "@/redux/services/fakeStoreApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [imgError, setImgError] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Product Details",
    });
  });
  //   normalize the id string
  const idStr = Array.isArray(id) ? id[0] : id;

  const ref = useRef<ICarouselInstance>(null);

  const progress = useSharedValue<number>(0);

  const { data: product, isLoading, error } = useGetProductByIdQuery(idStr);

  if (!idStr) return <Text>Invalid product ID</Text>;

  if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>Error fetching product details</Text>;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <SafeAreaView className="relative flex-1">
      <View>
        <Carousel
          ref={ref}
          width={width}
          height={height / 3}
          data={product?.images ?? []}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View>
              <Image
                source={
                  imgError ? require("@/assets/images/icon.png") : { uri: item }
                }
                className="h-full w-full"
                resizeMode="cover"
                onError={() => setImgError(true)}
              />
            </View>
          )}
        />
        <Pagination.Basic
          progress={progress}
          data={product?.images ?? []}
          dotStyle={{ backgroundColor: "gray", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
          activeDotStyle={{
            backgroundColor: COLORS.primary,
          }}
        />
      </View>

      {/* other product Details */}
      <View className="px-5">
        <View className="gap-5">
          <View className="flex-row justify-between items-center">
            <ProductCategoryPill category={product?.category.name ?? ""} />
            <Text className="font-bold text-xl text-primary">
              ${product?.price}
            </Text>
          </View>
          <Text className="text-xl text-center">{product?.description}</Text>
        </View>
      </View>
      {/* Add to Cart Button */}
      <View
        className="absolute w-full bottom-0 px-5"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <TouchableOpacity className="bg-primary py-4 rounded-lg">
          <Text className="text-center text-lg text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

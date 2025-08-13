import { clearCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Your cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-3">
            <Image
              className="rounded-lg"
              style={{
                width: 100,
                height: 100,
              }}
              source={{
                uri: item.images[0],
              }}
            />
            <View>
              <Text className="text-xl font-bold text-wrap">{item.title}</Text>
              <Text className="text-primary font-bold text-xl">
                ${item.price}
              </Text>
              <TouchableOpacity
                className="bg-red-500 rounded py-2 w-20"
                onPress={() => handleRemove(item.id)}
              >
                <Text className="text-white text-center text-lg">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg items-center mt-4"
        onPress={handleClearCart}
      >
        <Text className="text-white font-bold">Clear Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;

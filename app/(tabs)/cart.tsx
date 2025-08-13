import { clearCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1 p-4">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-lg">{item.title}</Text>
            <Text className="text-gray-500">${item.price}</Text>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded"
              onPress={() => handleRemove(item.id)}
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg items-center mt-4"
        onPress={handleClearCart}
      >
        <Text className="text-white font-bold">Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductList from "@/components/home/ProductList";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

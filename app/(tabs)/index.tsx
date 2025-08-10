import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategorySection from "@/components/home/CategorySection";
import ProductList from "@/components/home/ProductList";
import SearchSection from "@/components/home/SearchSection";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        {/* search section */}
        <SearchSection />
        {/* categories section */}
        <CategorySection />
        {/* product list section */}
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

import { TextInput, TouchableOpacity, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useState } from "react";

const SearchSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    // navigate to search screen with the searchTerm
    if (searchTerm.trim() === "") {
      console.log("no search term provided");
      // show a dialog
      return;
    }
    router.push({
      pathname: "/(tabs)/search",
      params: {
        search: searchTerm,
      },
    });
  };
  return (
    <View className=" bg-primary py-10">
      <View className="flex-row items-center border border-white bg-white mx-5 px-3 rounded-xl">
        <TextInput
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
          className="flex-1 py-6"
          placeholder="Enter the product name.."
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchSection;

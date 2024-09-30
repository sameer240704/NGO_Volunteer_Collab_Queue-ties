import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { router } from "expo-router";

const EmptyState = ({ title, desc }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="h-48 w-48" resizeMode="contain" />
      <Text className="font-semibold text-2xl text-gray-100">{title}</Text>
      <Text className="text-md font-medium text-white mt-1">{desc}</Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        customStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;

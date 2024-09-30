import { View, Image } from "react-native";
import { images } from "../constants";

const Loader = () => {
  return (
    <View className="min-h-[70vh] flex-1 justify-center items-center">
      <Image source={images.loader} className="h-20 w-20" />
    </View>
  );
};

export default Loader;

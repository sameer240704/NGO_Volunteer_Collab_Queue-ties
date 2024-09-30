import { View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

const Weather = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex justify-center items-center p-4">
          <Image
            source={images.logo}
            className="absolute left-40 top-2 h-14 w-14"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Weather;

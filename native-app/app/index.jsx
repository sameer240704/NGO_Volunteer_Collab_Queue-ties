import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthProvider";
import { images } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function App() {
  const { isLoading, isLoggedIn } = useAuthContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <View className="absolute w-full">
        <Image source={images.bgBlock} className="-mt-1" resizeMode="contain" />
      </View>
      <View className="flex-1 justify-center items-center px-5">
        <View className="w-24 h-24 bg-white rounded-full flex justify-center items-center mt-20 mb-5">
          <Image
            source={images.logo}
            className="w-32 h-32 ml-3"
            resizeMode="contain"
          />
        </View>
        <Text className="text-4xl font-extrabold text-primary-100 mt-10 mb-2 text-center tracking-wide">
          कृषक साथी
        </Text>
        <Text className="text-lg text-center mb-10 tracking-wide font-semibold">
          Empowering Farmers through Shared Resources and Smarter Farming
        </Text>
        <TouchableOpacity
          className="bg-primary-500 w-48 flex justify-center items-center py-3 px-8 rounded-md shadow-lg"
          onPress={() => router.push("/login")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2C72B5",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text className="text-white text-lg font-bold">Next</Text>
          <Icon
            name="arrow-right"
            size={16}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

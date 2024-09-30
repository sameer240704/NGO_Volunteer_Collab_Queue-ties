import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const Farm = () => {
  const { t } = useTranslation();

  return (
    <View contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-2xl font-bold text-gray-800">
          {t("fullName")}
        </Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
        <Text className="text-gray-600 mt-2">JSX</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
        <Text className="text-gray-600">fsgcjusgci</Text>
      </View>
    </View>
  );
};

export default Farm;

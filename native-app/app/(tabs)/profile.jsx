import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { images } from "../../constants";
import Farm from "../../pages/Farm";
import Farmer from "../../pages/Farmer";
import CustomAlert from "../../components/CustomAlert";

const Profile = () => {
  const { t } = useTranslation();
  const { logout } = useAuthContext();
  const [isFarmer, setIsFarmer] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSwitch = () => {
    setIsFarmer((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setIsModalVisible(true);
  };

  const confirmLogout = async () => {
    setIsModalVisible(false);
    await logout();
    router.replace("/login");
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex justify-center items-center p-4">
          <Image
            source={images.logo}
            className="absolute left-40 top-2 h-14 w-14"
          />
          <TouchableOpacity
            className="w-48 h-12 rounded-full shadow-lg justify-center items-center -left-14 flex-row mt-14"
            onPress={toggleSwitch}
            activeOpacity={0.8}
          >
            <View className="w-28 flex justify-center items-center">
              <Text
                className={`text-base font-bold w-1/2 text-center ${
                  isFarmer ? "text-primary-400" : "text-slate-400"
                }`}
              >
                {t("farmer")}
              </Text>
              <View
                className={`w-full h-1 rounded-full ${
                  isFarmer ? "bg-primary-400" : "text-slate-400"
                } mt-1`}
              />
            </View>
            <View className="w-28 flex justify-center items-center">
              <Text
                className={`text-base font-bold w-1/2 text-center ${
                  isFarmer ? "text-slate-400" : "text-primary-400"
                }`}
              >
                {t("farm")}
              </Text>
              <View
                className={`w-full h-1 rounded-full ${
                  !isFarmer ? "bg-primary-400" : "bg-transparent"
                } mt-1`}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View className="mx-6">{isFarmer ? <Farmer /> : <Farm />}</View>

        <TouchableOpacity
          onPress={handleLogout}
          className="absolute h-20 w-20 bg-transparent -right-3 -top-2"
        >
          <Image source={icons.logout} className="h-20 w-20" />
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        visible={isModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </SafeAreaView>
  );
};

export default Profile;

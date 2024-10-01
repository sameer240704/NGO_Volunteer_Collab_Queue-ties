import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { icons } from "../../constants";
import { images } from "../../constants";
import Loader from "../../components/Loader";
import Toast from "react-native-toast-message";
import FormField from "../../components/FormField";
import CustomAlert from "../../components/CustomAlert";
import { useUserData } from "../../context/useProfileData";
import CustomCarousel from "../../components/CustomCarousel";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuthContext();
  const { userData, isLoading, error } = useUserData();
  const [showToast, setShowToast] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editable, setEditable] = useState(false);

  const skillColors = [
    "#FF5733", // Red
    "#3357FF", // Blue
    "#8E44AD", // Purple
    "#E67E22", // Orange
    "#2ECC71", // Light Green
    "#3498DB", // Light Blue
    "#9B59B6", // Dark Purple
    "#E74C3C", // Dark Red
  ];

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-100">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex justify-center items-center p-4 mb-10">
          <Image
            source={images.logo}
            className="absolute left-3 top-3.5 h-10 w-10"
          />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="absolute h-20 w-20 bg-transparent -right-3 -top-2"
        >
          <Image source={icons.logout} className="h-20 w-20" />
        </TouchableOpacity>

        <View className="px-5">
          {userData.primaryImage && (
            <View className="h-30 w-full flex items-center mt-2 justify-center">
              <View className="border-4 rounded-full border-primary-800">
                <Image
                  source={{ uri: userData.primaryImage }}
                  className="h-24 w-24 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="mt-2 text-xl font-semibold text-primary-900">
                {userData.name}
              </Text>

              <View className="mt-2 flex flex-row flex-wrap items-center justify-center w-full">
                {userData.skills.map((skill, index) => (
                  <View
                    key={index}
                    className="rounded-full px-3 py-1 mr-2 mb-1 flex-row items-center"
                    style={{
                      backgroundColor: skillColors[index % skillColors.length],
                    }}
                  >
                    <View className="h-2 w-2 rounded-full bg-slate-100 mr-2"></View>
                    <Text className="text-sm text-white">{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <FormField
            name={t("phone")}
            value={userData.phone}
            customStyles="mt-4 mb-0"
            isEditable={editable}
          />

          <FormField
            name={t("email")}
            value={userData.email}
            customStyles="mt-4 mb-0"
            isEditable={false}
          />

          <FormField
            name={t("userType")}
            value={userData.role}
            customStyles="mt-4 mb-0"
            isEditable={false}
          />

          {userData.address1 && (
            <FormField
              name={t("address1")}
              value={userData.address1}
              customStyles="mt-4 mb-0"
              isEditable={editable}
            />
          )}

          {userData.address2 && (
            <FormField
              name={t("address2")}
              value={userData.address2}
              customStyles="mt-4 mb-0"
              isEditable={editable}
            />
          )}
          <FormField
            name={t("city")}
            value={userData.city}
            customStyles="mt-4 mb-0"
            isEditable={editable}
          />
          <FormField
            name={t("state")}
            value={userData.state}
            customStyles={`mt-4 ${
              userData.role === "volunteer" ? "mb-20" : "mb-7"
            }`}
            isEditable={editable}
          />

          {userData.ngoImages && userData.ngoImages.length > 0 && (
            <View>
              <Text className="text-base text-black font-semibold mb-3">
                {t("ngoImages")}
              </Text>
              <CustomCarousel data={userData.ngoImages} />
            </View>
          )}
        </View>
      </ScrollView>

      <CustomAlert
        visible={isModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    marginBottom: 20,
  },
  languageText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  personalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  personalInfo: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  changeImage: {
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default Profile;

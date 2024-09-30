import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFarmerData } from "../context/useProfileData";
import Toast from "react-native-toast-message";
import FormField from "../components/FormField";
import { Picker } from "@react-native-picker/picker";
import { icons } from "../constants";
import Loader from "../components/Loader";

const Farmer = () => {
  const { t, i18n } = useTranslation();
  const { farmerData, isLoading, error } = useFarmerData();
  const [showToast, setShowToast] = useState(false);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(farmerData.language);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setSelectedLanguage(langCode);
  };

  useEffect(() => {
    if (farmerData.language) {
      setSelectedLanguage(farmerData.language);
      handleLanguageChange(farmerData.language);
    }
  }, [farmerData]);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  if (showToast) {
    Toast.show({
      type: "error",
      text1: t("dataError"),
      text2: error,
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleShowDetails = () => {
    setShowAddDetails(!showAddDetails);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="">
        {farmerData.userImage && (
          <View className="h-30 w-full items-center mb-2">
            <View className="border-4 rounded-full border-primary-200">
              <Image
                source={{ uri: farmerData.userImage }}
                className="h-24 w-24 rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="mt-2 text-xl font-semibold text-primary-700">
              {farmerData.fullName}
            </Text>
          </View>
        )}

        <FormField
          name={t("phone")}
          value={farmerData.phone}
          customStyles="mt-4 mb-0"
          isEditable={false}
        />
        {farmerData.email && (
          <FormField
            name={t("email")}
            value={farmerData.email}
            customStyles="mt-4 mb-4"
            isEditable={false}
          />
        )}

        <View className="mb-5" style={styles.languageContainer}>
          <Text style={styles.languageText}>{t("language")}</Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#64748b",
              borderRadius: 6,
              overflow: "hidden",
              marginTop: 8,
            }}
          >
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              style={{
                height: 50,
                width: "100%",
                backgroundColor: "#fff",
              }}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="हिंदी" value="hi" />
              <Picker.Item label="मराठी" value="mr" />
            </Picker>
          </View>
        </View>

        <View style={styles.personalContainer} className="mt-5">
          <Text style={styles.personalInfo}>{t("PersonalInfo")}</Text>
          <TouchableOpacity onPress={() => setShowAddDetails(!showAddDetails)}>
            <Image
              style={styles.changeImage}
              source={showAddDetails ? icons.minus : icons.plus}
            />
          </TouchableOpacity>
        </View>

        {showAddDetails && (
          <View style={styles.detailsContainer}>
            <Text>{t("Additional Details")}</Text>

            <FormField
              name={t("address")}
              value={farmerData.address}
              customStyles="mt-4 mb-0"
              isEditable={false}
            />
            <FormField
              name={t("dob")}
              value={farmerData.dob}
              customStyles="mt-4 mb-4"
              isEditable={false}
            />
          </View>
        )}
      </View>

      <Toast />
    </ScrollView>
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

export default Farmer;

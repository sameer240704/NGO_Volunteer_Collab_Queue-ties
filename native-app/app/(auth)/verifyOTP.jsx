import React, { useState, useRef } from "react";
import { Image, Text, View, SafeAreaView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import LanguageButton from "../../components/LanguageButton";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const VerifyOTP = () => {
  const { t } = useTranslation();
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef([]);

  const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    if (index < 3 && value.length) {
      inputRefs.current[index + 1].focus();
    }

    setOTP(newOTP);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      Toast.show({
        type: "error",
        text1: t("Invalid OTP"),
        text2: t("Please enter a 4-digit OTP"),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const otpString = otp.join("");
      const otpNumber = parseInt(otpString, 10);
      if (otpNumber == 4224) {
        router.replace("/home");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("Verification Error"),
        text2: error.message || t("An error occurred"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <View className="flex-1 px-6 py-8">
        <View className="sticky left-9 justify-between items-center mb-20">
          <LanguageButton />
        </View>

        <Image
          source={images.logo}
          className="absolute left-36 top-9 h-20 w-20"
        />

        <Text className="text-lg font-bold mb-2 mt-14 tracking-tight">
          <Text className="">{t("helpYou")}</Text>
        </Text>
        <Text className="text-2xl font-extrabold tracking-wide text-green-500 mb-8">
          {t("verifyOtp")}
        </Text>

        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-green-500 rounded-full items-center justify-center">
            <Text className="text-white text-5xl">🔒</Text>
          </View>
        </View>

        <Text className="text-lg font-semibold mb-4">{t("enterOtp")}</Text>

        <View className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="numeric"
              style={{
                height: 50,
                width: 50,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 8,
                textAlign: "center",
                fontSize: 20,
                marginHorizontal: 5,
              }}
            />
          ))}
        </View>

        <CustomButton
          title={t("submit")}
          handlePress={submitOTP}
          customStyles="mt-4 bg-green-500 py-3 rounded-xl shadow-lg"
          textStyle="text-white text-lg font-bold"
          isLoading={isSubmitting}
        />
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default VerifyOTP;

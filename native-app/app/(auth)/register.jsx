import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LanguageButton from "../../components/LanguageButton";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";

const Register = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    role: "ngo",
    address1: "",
    address2: "",
    city: "",
    state: "",
    primaryImage: null,
    ngoImages: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelected, setCurrentSelected] = useState("ngo");
  const { register } = useAuthContext();

  const pickImage = async (mode) => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert(t("permissionError"));
      return;
    }

    let pickerResult;

    if (mode === "camera") {
      const cameraResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      pickerResult = cameraResult;
    } else {
      const galleryResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      pickerResult = galleryResult;
    }

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setForm({
        ...form,
        primaryImage: {
          uri: pickerResult.assets[0].uri,
          name: pickerResult.assets[0].fileName,
          type: pickerResult.assets[0].mimeType,
        },
      });
    }
  };

  const submitForm = async () => {
    let errorMessage = "";

    if (!form.fullName) {
      errorMessage += t("fullNameError") + "\n";
    }
    if (!form.password) {
      errorMessage += t("passwordError") + "\n";
    }
    if (!form.phone) {
      errorMessage += t("phoneError") + "\n";
    }
    if (!form.language) {
      errorMessage += t("languageError") + "\n";
    }
    if (!form.userImage) {
      errorMessage += t("imageError") + "\n";
    }

    if (errorMessage) {
      Toast.show({
        type: "error",
        text1: t("InvalidInput"),
        text2: errorMessage.trim(),
      });
    } else {
      setIsSubmitting(true);

      try {
        await register(form);
        router.replace("/verifyOTP");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: t("RegistrationError"),
          text2: error.response?.data?.message || t("An error occurred"),
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const deleteUserImage = () => {
    setForm({ ...form, primaryImage: null });
  };

  const handleUserTypeChange = (itemValue) => {
    setCurrentSelected(itemValue);
    setForm({ ...form, role: itemValue });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={images.logo}
          className="absolute left-36 top-2 h-20 w-20"
        />
        <View className="flex-1 px-6 py-8">
          <View className="sticky -top-6 left-9 justify-between items-center mb-20">
            <LanguageButton />
          </View>

          <Text className="text-3xl font-bold mb-2">
            <Text className="text-primary-100">{t("registerTitle")}</Text>{" "}
            {t("now")} !
          </Text>

          <View className="space-y-4">
            <FormField
              name={t(`${currentSelected}Name`)}
              value={form.name}
              handleChange={(e) => setForm({ ...form, name: e })}
              customStyles="mt-8"
            />

            <FormField
              name={t("password")}
              value={form.password}
              handleChange={(e) => setForm({ ...form, password: e })}
              customStyles="mt-7"
              secureTextEntry
            />

            <FormField
              name={t("email")}
              value={form.email}
              handleChange={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
              customStyles="mt-7"
            />

            <FormField
              name={t("phone")}
              value={form.phone}
              handleChange={(e) => setForm({ ...form, phone: e })}
              keyboardType="phone-pad"
              customStyles="mt-7 mb-3"
            />

            <View className="mb-4 mt-7">
              <Text className="text-base text-black font-semibold">
                {t("userType")}
              </Text>
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
                  selectedValue={form.role}
                  onValueChange={handleUserTypeChange}
                  style={{
                    height: 50,
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                >
                  <Picker.Item label="NGO" value="ngo" />
                  <Picker.Item label="Volunteer" value="volunteer" />
                </Picker>
              </View>
            </View>

            {currentSelected === "ngo" && (
              <FormField
                name={t("address1")}
                value={form.phone}
                handleChange={(e) => setForm({ ...form, address1: e })}
                keyboardType="phone-pad"
                customStyles="mt-5 mb-3"
              />
            )}

            {currentSelected === "ngo" && (
              <FormField
                name={t("address2")}
                value={form.phone}
                handleChange={(e) => setForm({ ...form, address2: e })}
                keyboardType="phone-pad"
                customStyles="mt-5 mb-3"
              />
            )}

            <FormField
              name={t("city")}
              value={form.city}
              handleChange={(e) => setForm({ ...form, city: e })}
              keyboardType="phone-pad"
              customStyles="mt-4 mb-3"
            />

            <FormField
              name={t("state")}
              value={form.state}
              handleChange={(e) => setForm({ ...form, state: e })}
              keyboardType="phone-pad"
              customStyles="mt-4 mb-3"
            />

            <View className="mb-3 mt-7 space-y-2">
              {form.role === "ngo" && (
                <Text className="text-base text-black font-semibold">
                  {t("ngoImage")}
                </Text>
              )}

              {form.role === "volunteer" && (
                <Text className="text-base text-black font-semibold">
                  {t("volunteerImage")}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => setImageSourceModalVisible(true)}
                className="w-full h-12 px-4 bg-white-100 border-2 border-slate-500 rounded-md focus:border-slate-400 justify-center"
              >
                <Text className="text-[#7b7b8b] font-medium text-base">
                  {form.primaryImage ? t("changeImage") : t("selectImage")}
                </Text>
              </TouchableOpacity>

              {form.primaryImage && (
                <View className="flex flex-row items-center gap-x-2">
                  <TouchableOpacity
                    onPress={deleteUserImage}
                    className="w-10 flex flex-col items-center rounded-lg bg-slate-100 hover:bg-slate-300 px-4 py-3"
                  >
                    <Image source={icons.deleteBtn} className="h-4 w-4" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="h-10 w-32 bg-slate-100 rounded-md py-1 shadow-md hover:bg-slate-300 transition-colors duration-200"
                  >
                    <Text className="text-black/50 hover:text-black text-md mt-1.5 font-semibold text-center">
                      {t("previewImage")}
                    </Text>
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <BlurView
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                      }}
                      intensity={80}
                      tint="dark"
                    >
                      <View className="flex-1 justify-center items-center">
                        <View className="bg-white rounded-lg p-4 w-3/4">
                          <Image
                            source={{
                              uri: form.primaryImage.uri,
                            }}
                            className="w-full h-64 rounded-md bg-opacity-50"
                            resizeMode="contain"
                          />
                          <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-2 bg-[#3b82f6] rounded-md py-2 items-center"
                            activeOpacity={0.8}
                          >
                            <Text className="text-white font-bold">
                              {t("close")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </BlurView>
                  </Modal>
                </View>
              )}
            </View>

            <CustomButton
              title={t("signUp")}
              handlePress={submitForm}
              customStyles="mt-7 bg-white py-3 rounded-xl shadow-lg"
              textStyle="text-primary text-lg font-bold"
              isLoading={isSubmitting}
            />

            <View className="flex-row justify-center mt-6 gap-x-1">
              <Text className="text-gray-600">{t("alreadyAccount")}</Text>
              <Link href="/login">
                <Text className="text-primary-100 font-semibold">
                  {t("signIn")}
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={imageSourceModalVisible}
        onRequestClose={() => setImageSourceModalVisible(false)}
      >
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          intensity={80}
          tint="dark"
        >
          <View className="flex-1 justify-center items-center">
            <View className="bg-white rounded-lg p-6 w-4/5">
              <Text className="text-lg font-bold text-center mb-4">
                {t("selectImageSource")}
              </Text>

              <View className="h-28 px-5 flex flex-row justify-center items-center gap-3">
                <TouchableOpacity
                  onPress={() => pickImage("camera")}
                  className="flex flex-col items-center rounded-lg bg-slate-100 px-4 py-2"
                >
                  <Image source={icons.camera} className="h-16 w-16" />
                  <Text className="mt-2">{t("camera")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => pickImage("gallery")}
                  className="flex flex-col items-center rounded-lg bg-slate-100 px-4 py-2"
                >
                  <Image source={icons.gallery} className="h-16 w-16" />
                  <Text className="mt-2">{t("gallery")}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setImageSourceModalVisible(false)}
                className="mt-4 bg-blue-500 rounded-lg h-10"
              >
                <Text className="text-center mt-1 text-xl text-white font-bold">
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
};

export default Register;

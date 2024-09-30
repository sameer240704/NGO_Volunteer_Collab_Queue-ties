import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LanguageButton from "../../components/LanguageButton";
import { StatusBar } from "expo-status-bar";
import { BarCodeScanner } from "expo-barcode-scanner";
import { icons } from "../../constants";

const Login = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuthContext();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const submitForm = async () => {
    if (!form.email) {
      Toast.show({
        type: "error",
        text1: t("InvalidInput"),
        text2: t("emailError"),
      });
    } else if (!form.password) {
      Toast.show({
        type: "error",
        text1: t("InvalidInput"),
        text2: t("passwordError"),
      });
    } else {
      setIsSubmitting(true);

      try {
        const response = await login(form.email, form.password);
        router.replace("/home");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Login Error",
          text2: error.response?.data?.message || "An error occurred",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(false);
    console.log(data);

    try {
      const { email, password } = JSON.parse(data);
      setForm({ email, password });
      Toast.show({
        type: "success",
        text1: t("QRCodeScanned"),
        text2: t("phonePasswordFilled"),
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("QRCodeError"),
        text2: t("invalidQRCodeData"),
      });
    }
  };

  if (hasPermission === null) {
    return <Text>{t("requestingCameraPermission")}</Text>;
  }

  if (hasPermission === false) {
    return <Text>{t("noCameraPermission")}</Text>;
  }

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

          <Text className="text-3xl font-bold mb-8 mt-10">
            <Text className="text-primary-100">{t("loginTitle")}</Text>{" "}
            {t("now")} !
          </Text>

          <View className="space-y-4">
            <FormField
              name={t("email")}
              value={form.email}
              handleChange={(e) => setForm({ ...form, email: e })}
              customStyles="mt-7"
            />

            <FormField
              name={t("password")}
              value={form.password}
              handleChange={(e) => setForm({ ...form, password: e })}
              customStyles="mt-7"
              secureTextEntry
            />

            <CustomButton
              title={t("signIn")}
              handlePress={submitForm}
              customStyles="mt-7 py-3 rounded-md shadow-lg"
              textStyle="text-primary text-lg font-bold"
              isLoading={isSubmitting}
            />

            <TouchableOpacity
              className="mt-5 p-3 border rounded-md border-gray-400"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-center text-primary-100 font-semibold">
                {t("scanQRCode")}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6 gap-x-1">
              <Text className="text-gray-600">{t("noAccount")}</Text>
              <Link href="/register">
                <Text className="text-primary-100 font-semibold">
                  {t("signUp")}
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            className="absolute top-5 right-5 rounded-full"
            onPress={() => setModalVisible(false)}
          >
            <Image source={icons.close} className="h-10 w-10" />
          </TouchableOpacity>
        </View>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
};

export default Login;

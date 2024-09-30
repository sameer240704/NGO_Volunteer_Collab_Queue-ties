import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useFarmerData } from "../../context/useProfileData";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TabIcon = ({ icon, color, name, focused }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <View className="flex-1 justify-center items-center top-1.5 gap-1">
      <Animated.View
        style={{
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{ tintColor: color, height: 24, width: 24 }}
        />
      </Animated.View>
      <Animated.Text
        className={`text-[12px] ${
          focused
            ? "font-bold text-primary-400"
            : "font-normal text-secondary-200"
        }`}
      >
        {name}
      </Animated.Text>
    </View>
  );
};

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  const { t, i18n } = useTranslation();
  const { farmerData, isLoading, error } = useFarmerData();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  useEffect(() => {
    if (farmerData.language) {
      handleLanguageChange(farmerData.language);
    }
  }, [farmerData]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4a9f2f",
        tabBarInactiveTintColor: "#b0b0b0",
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom,
          left: 10,
          right: 10,
          bottom: 6,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 20,
          height: 60,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("home"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name={t("home")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: t("market"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.marketplace}
              color={color}
              name={t("market")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: t("krishak.ai"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.chatbot}
              color={color}
              name={t("krishak.ai")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: t("weather"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.weather}
              color={color}
              name={t("weather")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: t("message"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.message}
              color={color}
              name={t("message")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name={t("profile")}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useUserData } from "../../context/useProfileData";

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
          style={{ tintColor: color, height: 20, width: 20 }}
        />
      </Animated.View>
      <Animated.Text
        className={`text-[12px] ${
          focused
            ? "font-bold text-primary-900"
            : "font-normal text-primary-300"
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
  const { farmerData, isLoading, error } = useUserData();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#175B83",
        tabBarInactiveTintColor: "#A7C6E7",
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom,
          left: 10,
          right: 10,
          bottom: 6,
          backgroundColor: "#E0F7FA",
          borderRadius: 10,
          height: 55,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
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

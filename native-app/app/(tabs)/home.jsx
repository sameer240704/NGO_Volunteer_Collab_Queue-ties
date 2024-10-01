import { View, Image, ScrollView, Text, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useUserData } from "../../context/useProfileData";
import TopVolunteers from "../../components/TopVolunteers";
import TopAdmins from "../../components/TopAdmins";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  const [activeChart, setActiveChart] = useState(0);
  const { userData, isLoading, error } = useUserData();

  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Drives every month",
        data: [1, 8, 2, 4, 3, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ["Monthly Drives"],
  };

  const barData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Volunteers every month",
        data: [30, 55, 25, 95, 85, 70],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ["Volunteer Participation"],
  };

  const volunteers = [
    {
      id: 1,
      name: "John Doe",
      contributions: 50,
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727688582/eg74nhvqn2ewavqutjoc.png",
    },
    {
      id: 2,
      name: "Butterflies India",
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727694301/hkdagqapxjgxgfr2rm3m.png",
    },
    {
      id: 3,
      name: "Akshaya Patra Foundation",
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727694029/regacrxqsnsjrnv5gwfq.jpg",
    },
  ];

  const admins = [
    {
      id: 1,
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727694390/bggck7zskhygjjbn7nwg.png",
      name: "Aditi Ambasta",
    },
    {
      id: 2,
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727694522/u7unfgm3mqmiopqj08u8.jpg",
      name: "Parth Gala",
    },
    {
      id: 3,
      primaryImage:
        "https://res.cloudinary.com/dvk7w5nsg/image/upload/v1727694449/pys7tb6zcprzkwi7eenm.jpg",
      name: "Dnyanesh Sawant",
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#2E6A8A",
    backgroundGradientFromOpacity: 0.7,
    backgroundGradientTo: "#1B3A4B",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    style: {
      borderRadius: 16,
    },
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const chartWidth = screenWidth;
    const newActiveChart = Math.round(contentOffsetX / chartWidth);
    setActiveChart(newActiveChart);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row gap-0 mx-4 mt-4 mb-2">
          <Image
            source={{ uri: userData.primaryImage }}
            className="h-14 w-14 rounded-full mr-2"
          />
          <View className="flex justify-start items-start gap-0">
            <Text className="text-lg font-extrabold text-center text-slate-400">
              Welcome,
            </Text>
            <Text className="text-lg text-center font-semibold">
              {userData.name}
            </Text>
          </View>
        </View>

        <View className="px-4">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ flexDirection: "row" }}
          >
            <View style={{ width: screenWidth, paddingHorizontal: 0 }}>
              <LineChart
                data={data}
                width={screenWidth - 35}
                height={240}
                chartConfig={chartConfig}
                bezier
                style={{
                  borderRadius: 16,
                  marginVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              />
            </View>

            <View style={{ width: screenWidth }}>
              <BarChart
                data={barData}
                width={screenWidth - 35}
                height={240}
                chartConfig={chartConfig}
                style={{
                  borderRadius: 16,
                  marginVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  marginLeft: -30,
                }}
              />
            </View>
          </ScrollView>

          <View className="flex-row justify-center">
            {[0, 1].map((index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  activeChart === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>

        <TopVolunteers volunteers={volunteers} />
        <TopAdmins admins={admins} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import { View, Image, ScrollView, Text, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useFarmerData } from "../../context/useProfileData";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  const [activeChart, setActiveChart] = useState(0);
  const { farmerData, isLoading, error } = useFarmerData();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30, 55, 35, 95, 85, 70],
      },
    ],
  };

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
    const chartWidth = screenWidth; // Changed to full screen width for each chart
    const newActiveChart = Math.round(contentOffsetX / chartWidth);
    setActiveChart(newActiveChart);
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
        </View>

        <View className="flex-row gap-0 mx-4 mt-8">
          <Image source={images.logo} className="h-14 w-14" />
          <View className="flex justify-start items-start gap-0">
            <Text className="text-lg font-extrabold text-center text-slate-400">
              Welcome,
            </Text>
            <Text className="text-lg text-center font-semibold">
              {farmerData.fullName}
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
            style={{ flexDirection: "row" }} // Ensures charts align horizontally
          >
            <View style={{ width: screenWidth, paddingHorizontal: 0 }}>
              <LineChart
                data={data}
                width={screenWidth - 35}
                height={200}
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
                height={200}
                chartConfig={chartConfig}
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
          </ScrollView>

          <View className="flex-row justify-center mt-4">
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

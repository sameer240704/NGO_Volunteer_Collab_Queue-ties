import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { icons } from "../constants";

const CustomCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <View style={styles.carouselContainer}>
      <TouchableOpacity
        onPress={handlePrev}
        className="absolute z-10 rotate-180 left-0 opacity-50"
      >
        <Image source={icons.arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      <View
        style={styles.imageContainer}
        className="border-2 border-primary-200"
      >
        {data.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item }}
            style={[
              styles.image,
              {
                opacity: currentIndex === index ? 1 : 0,
                position: currentIndex === index ? "absolute" : "absolute",
                top: 0,
                left: 0,
              },
            ]}
            resizeMode="cover"
          />
        ))}
      </View>

      <TouchableOpacity
        className="absolute z-10 right-0 opacity-50"
        onPress={handleNext}
      >
        <Image source={icons.arrow} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 100,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -15 }],
    zIndex: 1,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
});

export default CustomCarousel;

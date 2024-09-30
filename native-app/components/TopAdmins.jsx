import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const getCurrentMonth = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth();
  return months[currentMonthIndex];
};

const TopAdmins = ({ admins }) => {
  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "#FFD700"; // Gold
      case 1:
        return "#C0C0C0"; // Silver
      case 2:
        return "#CD7F32"; // Bronze
      default:
        return "#000"; // Default color for others
    }
  };

  const renderAdmin = ({ item, index }) => (
    <View style={styles.adminCard}>
      <View
        style={[styles.rankCircle, { backgroundColor: getRankColor(index) }]}
      >
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>

      <Image source={{ uri: item.primaryImage }} style={styles.image} />

      <View style={styles.adminInfo}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container} className="mt-4">
      <Text style={styles.title}>
        Most Impactful NGOs of {getCurrentMonth()}
      </Text>

      <FlatList
        data={admins.slice(0, 5)} // Adjust the slice as needed
        renderItem={renderAdmin}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 135,
    marginHorizontal: 8,
    borderRadius: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  adminCard: {
    width: width / 3,
    height: 100,
    backgroundColor: "#fff",
    padding: 0,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  rankCircle: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  adminInfo: {
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default TopAdmins;

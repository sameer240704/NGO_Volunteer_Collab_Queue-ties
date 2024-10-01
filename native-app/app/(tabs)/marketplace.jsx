import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { icons } from "../../constants";
import { Feather } from "@expo/vector-icons";

const Marketplace = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: "",
    type: "",
    rating: 0,
    donationType: "",
    donationAmount: 0,
    contact: "",
    email: "",
    products: [],
    ngoList: [],
    image: null,
  });
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://192.168.1.131:4224/seller");
        console.log(response.data);
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  const handleAddSeller = async () => {
    const formData = new FormData();
    Object.keys(newSeller).forEach((key) => {
      if (key === "products" || key === "ngoList") {
        formData.append(key, JSON.stringify(newSeller[key]));
      } else if (key === "image" && newSeller.image) {
        formData.append("image", {
          uri: newSeller.image.uri,
          type: newSeller.image.type,
          name: newSeller.image.fileName,
        });
      } else {
        formData.append(key, newSeller[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://192.168.1.131:4224/seller/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSellers([...sellers, response.data]);
      resetNewSeller();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding seller:", error);
    }
  };

  const resetNewSeller = () => {
    setNewSeller({
      name: "",
      type: "",
      rating: 0,
      donationType: "",
      donationAmount: 0,
      contact: "",
      email: "",
      products: [],
      ngoList: [],
      image: null,
    });
  };

  const renderSellerCard = ({ item }) => (
    <View style={styles.card} className="flex-row justify-between">
      <View>
        <Text style={styles.sellerName}>{item.name}</Text>
        <Text style={styles.sellerType}>{item.type}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.rating} ★</Text>
        </View>
        <Text style={styles.donationType}>Donation: {item.donationType}</Text>
        <Text style={styles.donationAmount}>
          Amount: ₹{item.donationAmount.toLocaleString("en-IN")}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.sellerImage} />
        )}
        <TouchableOpacity
          title="View Details"
          onPress={() => setSelectedSeller(item)}
          className="rounded-lg bg-primary-400 px-3 py-2"
        >
          <Text className="text-slate-900 font-bold text-md">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSellerDetails = () => {
    if (!selectedSeller) return null;

    return (
      <Modal visible={Boolean(selectedSeller)} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedSeller.name}</Text>
          <Image
            source={{ uri: selectedSeller.image }}
            style={styles.modalImage}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.modalText}>Type: {selectedSeller.type}</Text>
            <Text style={styles.modalText}>
              Rating: {selectedSeller.rating}
            </Text>
            <Text style={styles.modalText}>
              Donation Type: {selectedSeller.donationType}
            </Text>
            <Text style={styles.modalText}>
              Amount: ₹{selectedSeller.donationAmount.toLocaleString("en-IN")}
            </Text>
            <Text style={styles.modalText}>
              Contact: {selectedSeller.contact}
            </Text>
            <Text style={styles.modalText}>Email: {selectedSeller.email}</Text>
            <Text style={styles.modalText}>
              Products: {selectedSeller.products.join(", ") || "None"}
            </Text>
            <Text style={styles.modalText}>
              NGOs: {selectedSeller.ngoList.join(", ") || "None"}
            </Text>
          </View>
          <Button
            title="Close"
            onPress={() => setSelectedSeller(null)}
            color="#FF5733"
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container} className="relative">
      <TextInput
        placeholder="Search Sellers"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowAddForm(true)}
        className="z-10"
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      {showAddForm && (
        <Modal visible={showAddForm} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Seller</Text>
            <TextInput
              placeholder="Name"
              value={newSeller.name}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, name: value })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Type"
              value={newSeller.type}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, type: value })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Rating"
              value={String(newSeller.rating)}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, rating: parseFloat(value) })
              }
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Donation Type"
              value={newSeller.donationType}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, donationType: value })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Donation Amount"
              value={String(newSeller.donationAmount)}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, donationAmount: parseInt(value) })
              }
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Contact Number"
              value={newSeller.contact}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, contact: value })
              }
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Email Address"
              value={newSeller.email}
              onChangeText={(value) =>
                setNewSeller({ ...newSeller, email: value })
              }
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Products (comma-separated)"
              value={newSeller.products.join(", ")}
              onChangeText={(value) =>
                setNewSeller({
                  ...newSeller,
                  products: value.split(",").map((p) => p.trim()),
                })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="NGOs (comma-separated)"
              value={newSeller.ngoList.join(", ")}
              onChangeText={(value) =>
                setNewSeller({
                  ...newSeller,
                  ngoList: value.split(",").map((n) => n.trim()),
                })
              }
              style={styles.input}
            />

            <View className="flex-row justify-center w-full gap-x-3 px-2 -ml-2 mt-5">
              <TouchableOpacity
                onPress={handleAddSeller}
                className="w-1/2 items-center justify-center rounded-md h-10 bg-primary-100"
              >
                <Text className="text-xl">Add Seller</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowAddForm(false)}
                className="w-1/2 items-center justify-center rounded-md h-10 bg-slate-500"
              >
                <Text className="text-xl">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        data={sellers.filter((seller) =>
          seller.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={renderSellerCard}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
      />

      {renderSellerDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  createButton: {
    backgroundColor: "#0095f6",
    opacity: 0.7,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    position: "absolute",
    right: 10,
    bottom: 65,
    borderRadius: 50,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sellerType: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: "#FFD700",
  },
  donationType: {
    fontSize: 14,
    marginBottom: 5,
  },
  donationAmount: {
    fontSize: 14,
    marginBottom: 5,
  },
  imageContainer: {
    alignItems: "flex-start",
  },
  sellerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default Marketplace;

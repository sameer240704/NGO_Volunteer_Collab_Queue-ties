import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import Stories from "../../components/Stories";
import Posts from "../../components/Posts";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { usePostsData } from "../../context/usePostsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const samplePosts = [
  {
    id: 1,
    username: "user1",
    userImage: "https://example.com/user1.jpg",
    imageUrl: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    username: "user2",
    userImage: "https://example.com/user2.jpg",
    imageUrl: "https://example.com/image2.jpg",
  },
];

const Community = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostCaption, setNewPostCaption] = useState("");
  const { postsData, isLoading, error, refetchPosts } = usePostsData();

  const [form, setForm] = useState({
    caption: "",
    postImage: null,
  });

  const openImagePicker = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert(t("permissionError"));
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setForm({
        ...form,
        postImage: {
          uri: pickerResult.assets[0].uri,
          name: pickerResult.assets[0].fileName,
          type: pickerResult.assets[0].mimeType,
        },
      });
    }
  };

  const handleCreatePost = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        alert("User not found!");
        return;
      }

      const formData = new FormData();
      formData.append("uploadedBy", userId);
      formData.append("caption", formData.caption);
      formData.append("postImages", {
        uri: form.postImage.uri,
        type: form.postImage.type,
        name: form.postImage.name,
      });

      const response = await axios.post(
        "http://192.168.1.131:4224/community/createPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Post uploaded successfully!");
        refetchPosts();
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Error uploading image");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <StatusBar />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={<Stories />}
        data={samplePosts}
        renderItem={({ item }) => <Posts posts={postsData} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New Post</Text>
              <TouchableOpacity onPress={handleCreatePost}>
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={openImagePicker}
              >
                {newPostImage ? (
                  <Image
                    source={{ uri: form.postImage.uri }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Feather name="image" size={40} color="#999" />
                    <Text style={styles.placeholderText}>Upload a photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.captionContainer}>
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                value={newPostCaption}
                onChangeText={setNewPostCaption}
                multiline
              />
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createPostButton: {
    position: "absolute",
    right: 10,
    bottom: 65,
    backgroundColor: "#0095f6",
    opacity: 0.7,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shareText: {
    color: "#0095f6",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  imagePickerButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 10,
    color: "#999",
    fontSize: 16,
  },
  captionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 20,
  },
  captionInput: {
    fontSize: 16,
    maxHeight: 100,
  },
});

export default Community;

import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video } from "expo-av";
import { useStoriesData } from "../context/useCommunityData";
import Loader from "./Loader";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const { storiesData, isLoading, error, refetchStories } = useStoriesData();

  console.log(storiesData);

  if (isLoading) {
    return <Loader />;
  }

  const handleStoryPress = (story) => {
    setSelectedStory(story);
  };

  const pickVideo = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const videoData = {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      };

      setUploadedVideo(videoData);
      uploadVideo(videoData);
    }
  };

  const uploadVideo = async (videoData) => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        alert("User not found!");
        return;
      }

      const formData = new FormData();
      formData.append("uploadedBy", userId);
      formData.append("uploadedVideo", {
        uri: videoData.uri,
        type: videoData.type,
        name: videoData.name,
      });

      const response = await axios.post(
        "http://192.168.1.131:4224/community/createStory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Video uploaded successfully!");
        refetchStories();
      } else {
        alert("Failed to upload video");
      }
    } catch (error) {
      console.error("Video upload failed:", error);
      alert("Error uploading video");
    }
  };

  return (
    <ScrollView horizontal style={styles.storiesContainer} className="h-32">
      <View className="flex flex-row mt-2 gap-x-3 mr-6">
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickVideo}
          className="h-20 w-20 rounded-full bg-slate-100 items-center justify-center"
        >
          <Text style={styles.uploadText}>+</Text>
        </TouchableOpacity>

        {storiesData.map((story) => (
          <TouchableOpacity
            key={story.videoUrl}
            style={styles.storyAvatarContainer}
            onPress={() => handleStoryPress(story)}
            className="h-20 w-20 rounded-full items-center justify-center"
          >
            <Image
              source={{ uri: story.imageUrl }}
              style={styles.avatar}
              className="h-20 w-20 rounded-full mt-6"
            />
            <Text style={styles.userName}>{story.userName}</Text>
          </TouchableOpacity>
        ))}

        {selectedStory && (
          <StoryModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </View>
    </ScrollView>
  );
};

const StoryModal = ({ story, onClose }) => {
  const videoRef = useRef(null);

  return (
    <Modal visible={!!story} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: story.videoUrl }}
          isLooping
          resizeMode="contain"
          shouldPlay
          useNativeControls
        />
        <Text style={styles.caption}>{story.user}</Text>
      </View>
    </Modal>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  userName: {
    fontSize: 12,
    marginTop: 4,
    color: "#333",
  },
  uploadText: {
    fontSize: 32,
    color: "#007bff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    color: "#fff",
  },
  video: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  caption: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Stories;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Posts = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId, comment) => {
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));
  };

  return (
    <>
      <View style={styles.container} className="mx-2 mt-2 relative">
        <ScrollView className="relative">
          {posts.map((post) => (
            <View
              key={post.mediaUrl}
              style={styles.postContainer}
              className="rounded-xl overflow-hidden"
            >
              <View style={styles.header}>
                <Image
                  source={{ uri: post.userImage }}
                  style={styles.userImage}
                />
                <Text style={styles.username}>{post.name}</Text>
                <Feather
                  name="more-horizontal"
                  size={24}
                  color="black"
                  style={styles.moreIcon}
                />
              </View>

              <Image source={{ uri: post.mediaUrl }} style={styles.mainImage} />

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => toggleLike(post.id)}>
                  <Feather
                    name={likedPosts[post.id] ? "heart" : "heart"}
                    size={28}
                    color={likedPosts[post.id] ? "red" : "black"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="message-circle" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="send" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkIcon}>
                  <Feather name="bookmark" size={28} color="black" />
                </TouchableOpacity>
              </View>

              <Text style={styles.likes}>
                {post.likeCount + (likedPosts[post.id] ? 1 : 0)} likes
              </Text>

              <Text style={styles.caption}>
                <Text className="font-semibold mr-5">{post.name}</Text>
                {"  "}
                {post.caption}
              </Text>

              {comments[post.id] &&
                comments[post.id].map((comment, index) => (
                  <Text key={index} style={styles.comment}>
                    <Text style={styles.commentUsername}>username</Text>{" "}
                    {comment}
                  </Text>
                ))}

              <View style={styles.addComment}>
                <TextInput
                  placeholder="Add a comment..."
                  style={styles.commentInput}
                  onSubmitEditing={(event) =>
                    addComment(post.id, event.nativeEvent.text)
                  }
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    position: "relative",
  },
  postContainer: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moreIcon: {
    marginLeft: "auto",
  },
  mainImage: {
    width: "100%",
    aspectRatio: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 14,
    padding: 10,
  },
  bookmarkIcon: {
    marginLeft: "auto",
  },
  likes: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  caption: {
    padding: 10,
    paddingTop: 0,
  },
  comment: {
    padding: 10,
    paddingTop: 0,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  addComment: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#efefef",
  },
  commentInput: {
    flex: 1,
  },
  createPostButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#0095f6",
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
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imagePickerButton: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  captionInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#0095f6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: "#0095f6",
  },
});

export default Posts;

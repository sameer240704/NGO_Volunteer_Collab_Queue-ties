import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const Feedback = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "text/comma-separated-values",
        copyToCacheDirectory: true,
      });

      if (file.canceled) {
        Alert.alert("File selection canceled.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: file.assets[0].uri,
        name: file.assets[0].name,
        type: "text/csv",
      });

      const response = await axios.post(
        "http://192.168.1.131:5000/generate-summary",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(response.data.summary);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert("Error uploading file", error.message);
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question) {
      Alert.alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://192.168.1.131:5000/generate-summary", // Replace with the correct endpoint for questions
        {
          question: question,
        }
      );

      setResponse(response.data.answer); // Assuming your backend returns an answer key
      setLoading(false);
      setQuestion(""); // Clear the question input after submission
    } catch (error) {
      console.error("Error asking question:", error);
      Alert.alert("Error asking question", error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Analysis</Text>

      <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload CSV File</Text>
      </TouchableOpacity>

      {loading && <Text>Loading...</Text>}

      {summary !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Generated Summary:</Text>
          <Text style={styles.resultText}>{summary}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Ask a question about the feedback"
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={handleQuestionSubmit}>
        <Text style={styles.buttonText}>Submit Question</Text>
      </TouchableOpacity>

      {response !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Response:</Text>
          <Text style={styles.resultText}>{response}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: "#6200ee",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    padding: 8,
    marginTop: 20,
  },
});

export default Feedback;

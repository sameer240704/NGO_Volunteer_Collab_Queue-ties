import React, { useState } from "react";
import axios from "axios";

const FeedbackAdminModal = () => {
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-summary",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSummary(response.data.summary);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question) {
      alert("Please ask a question.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/ask-question", {
        question,
      });
      setResponse(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
      alert("Error asking question: " + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-5/6 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Feedback Analysis
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-6 border border-gray-300 p-4 rounded w-full text-lg"
      />
      <button
        onClick={handleSubmit}
        className={`bg-blue-600 text-white py-3 px-6 rounded w-full text-lg transition duration-300 ease-in-out hover:bg-blue-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      <div className="h-48 my-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <h3 className="font-semibold text-xl mb-2">Generated Summary:</h3>
        <p className="text-lg text-gray-700">{summary}</p>
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-4">Ask a Question:</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-300 p-4 rounded mb-4 w-full text-lg"
          placeholder="Type your question here..."
        />
        <button
          onClick={handleAskQuestion}
          className="bg-green-600 text-white py-3 px-6 rounded w-full text-lg transition duration-300 ease-in-out hover:bg-green-500"
        >
          Ask
        </button>
      </div>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-xl mb-2">Response:</h3>
          <p className="text-lg text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackAdminModal;

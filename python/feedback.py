import streamlit as st
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader, TextLoader, CSVLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
import tempfile
import time
import pandas as pd
import io
import requests
from tenacity import retry, stop_after_attempt, wait_exponential

# Set page config
st.set_page_config(page_title="Feedback Analysis", layout="wide")

# Hardcoded API key (replace with your actual key)
GROQ_API_KEY = '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'

# Initialize session state
if "processed_file" not in st.session_state:
    st.session_state.processed_file = False
    st.session_state.vectors = None
    st.session_state.chat_history = []
    st.session_state.initial_summary = None

def process_file(file, file_type):
    with tempfile.NamedTemporaryFile(delete=False, suffix=f'.{file_type}') as tmp_file:
        tmp_file.write(file.getvalue())
        tmp_file_path = tmp_file.name

    if file_type == 'pdf':
        loader = PyPDFLoader(tmp_file_path)
    elif file_type == 'txt':
        loader = TextLoader(tmp_file_path)
    elif file_type == 'csv':
        loader = CSVLoader(tmp_file_path)

    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(documents)
    
    embeddings = HuggingFaceEmbeddings()
    vectorstore = FAISS.from_documents(splits, embeddings)
    
    return vectorstore

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def get_chatgroq_response(user_input, is_initial_summary=False):
    llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name="mixtral-8x7b-32768")

    if is_initial_summary:
        prompt = ChatPromptTemplate.from_template(
            """
            Analyze all the feedback provided in the context for multiple volunteers and provide a comprehensive summary.
            Focus on:
            1. Overall sentiment of the feedback across all volunteers
            2. Common themes or patterns observed in the feedback
            3. Key strengths mentioned for various volunteers (provide 2-3 examples if applicable)
            4. Common areas for improvement across volunteers
            5. Any notable or unique suggestions that stand out

            Provide a well-structured summary that captures the essence of all the feedback, giving a holistic view of the volunteers' performance.
            Remember to keep the summary general, mentioning specific volunteers only as examples (2-3 at most) where relevant.

            <context>
            {context}
            </context>
            """
        )
    else:
        prompt = ChatPromptTemplate.from_template(
            """
            Analyze the feedback provided in the context for all volunteers and answer the following question.
            Provide a concise and relevant response based on the overall feedback data, not focusing on any single volunteer unless specifically asked.

            <context>
            {context}
            </context>

            User question: {input}
            """
        )

    document_chain = create_stuff_documents_chain(llm, prompt)
    retriever = st.session_state.vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    start = time.process_time()
    try:
        response = retrieval_chain.invoke({"input": user_input})
        end = time.process_time()
        return response['answer'], end - start
    except requests.exceptions.RequestException as e:
        st.error(f"Error communicating with the Groq API: {str(e)}")
        raise
    except Exception as e:
        st.error(f"An unexpected error occurred: {str(e)}")
        raise

# Main app
def main():
    st.title("Feedback Analysis")

    file_type = st.selectbox("Choose file type", ["csv", "pdf", "txt"])
    uploaded_file = st.file_uploader(f"Choose a {file_type.upper()} file", type=file_type)

    if uploaded_file is not None:
        if not st.session_state.processed_file:
            with st.spinner(f'Processing {file_type.upper()} and generating summary... This may take a few minutes.'):
                try:
                    st.session_state.vectors = process_file(uploaded_file, file_type)
                    st.session_state.processed_file = True
                    
                    # Generate initial summary
                    initial_summary, summary_time = get_chatgroq_response("", is_initial_summary=True)
                    st.session_state.initial_summary = initial_summary
                    
                    st.success(f"{file_type.upper()} processed and summary generated successfully!")
                except Exception as e:
                    st.error(f"Error processing file: {str(e)}")
                    return

        # Display initial summary
        if st.session_state.initial_summary:
            st.subheader("Feedback Summary")
            st.write(st.session_state.initial_summary)
            st.markdown("---")

        st.subheader("Ask Additional Questions")
        # Display chat messages
        for message in st.session_state.chat_history:
            with st.chat_message(message["role"]):
                st.markdown(message["content"])

        # Chat input
        user_input = st.chat_input("Ask a question about the feedback:")

        if user_input:
            # Display user message
            st.chat_message("user").markdown(user_input)
            # Add user message to chat history
            st.session_state.chat_history.append({"role": "user", "content": user_input})

            with st.spinner('Analyzing feedback...'):
                try:
                    response, response_time = get_chatgroq_response(user_input)

                    # Display assistant response
                    with st.chat_message("assistant"):
                        st.markdown(response)
                        st.caption(f"Analysis time: {response_time:.2f} seconds")

                    # Add assistant response to chat history
                    st.session_state.chat_history.append({"role": "assistant", "content": response})
                except Exception as e:
                    st.error("Unable to process your request at this time. Please try again later.")
                    st.error(f"Error details: {str(e)}")

    else:
        st.info(f"Please upload a {file_type.upper()} file to begin the analysis.")

if __name__ == "__main__":
    main()
from flask import Flask, request, jsonify
from rag_llm import RAGPipelineSetup

app = Flask(__name__)

# Initialize your RAG pipeline setup here
rag_pipeline_setup = RAGPipelineSetup(
    qdrant_url="your_qdrant_url",
    qdrant_api_key="your_qdrant_api_key",
    qdrant_collection_name="your_qdrant_collection_name",
    huggingface_api_key="your_huggingface_api_key",
    embeddings_model_name="your_embeddings_model_name",
    groq_api_key="your_groq_api_key"
)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')
    source = data.get('source')

    if not question or not source:
        return jsonify({'error': 'Missing question or source'}), 400

    # Get RAG pipeline
    rag_pipeline = rag_pipeline_setup.rag(source)

    # Generate response
    try:
        result = rag_pipeline.run(question)
        return jsonify({'response': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)

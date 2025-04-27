import os
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import re

class RAGPipeline:
    def __init__(self, data_path="data/cft.txt", model_name="all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self.docs = self._load_data(data_path)
        self.embeddings = self.model.encode(self.docs)
        self.index = faiss.IndexFlatL2(self.embeddings.shape[1])
        self.index.add(np.array(self.embeddings).astype("float32"))

    def _load_data(self, file_path):
        full_path = os.path.join(os.path.dirname(__file__), file_path)
        with open(full_path, 'r', encoding='utf-8') as f:
            raw = f.read()

        # Extract all Q&A pairs
        qa_pairs = re.findall(r"Q\d+: (.*?)\nA\d+: (.*?)(?=\nQ\d+:|\Z)", raw, re.DOTALL)

        # Combine into readable doc strings: "What is X? Answer: Y"
        cleaned_docs = [f"{q.strip()} Answer: {a.strip()}" for q, a in qa_pairs]
        return cleaned_docs

    def query(self, prompt, k=3):
        query_vec = self.model.encode([prompt])
        D, I = self.index.search(np.array(query_vec).astype("float32"), k)
        return [self.docs[i] for i in I[0]]

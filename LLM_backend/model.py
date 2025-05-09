from rag import RAGPipeline
from transformers import AutoTokenizer, AutoModelForCausalLM

rag = RAGPipeline()
tokenizer = AutoTokenizer.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")
model = AutoModelForCausalLM.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")

def generate_response(prompt: str):
    top_docs = rag.query(prompt)
    context = "\n".join(top_docs)
    
    final_prompt = f"""Use the following context to answer the question.

Context:
{context}

Question: {prompt}
Answer:"""

    inputs = tokenizer(final_prompt, return_tensors="pt")
    outputs = model.generate(inputs["input_ids"], max_new_tokens=100)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Trim repeated prompt if model echoes it
    if "Answer:" in answer:
        return answer.split("Answer:")[-1].strip()
    return answer.strip()

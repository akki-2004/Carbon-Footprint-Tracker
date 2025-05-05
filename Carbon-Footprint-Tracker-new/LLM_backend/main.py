from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import generate_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(data: dict):
    question = data.get("question")
    if not question:
        return {"answer": "No question provided."}
    response = generate_response(question)
    print("Generated response:", response)  # 👈 Add this
    return {"answer": response}

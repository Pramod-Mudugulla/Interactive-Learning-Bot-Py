import json
from difflib import get_close_matches

def load_knowledge_base(file_path: str) -> dict:
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Knowledge base file '{file_path}' not found.")
        return {"questions": []}
    except json.JSONDecodeError:
        # print(f"Error decoding JSON from file '{file_path}'.")
        return {"questions": []}

def save_knowledge_base(file_path: str, data: dict):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def find_best_match(user_question: str, questions: list[str]) -> str | None:
    matches = get_close_matches(user_question, questions, n=1, cutoff=0.60)
    return matches[0] if matches else None

def get_answer_for_question(question: str, knowledge_base: dict) -> str | None:
    for q in knowledge_base["questions"]:
        if q["question"] == question:
            return q["answer"]
    return None

def get_chatbot_response(user_input: str) -> tuple[str, bool]:
    # print(f"User input: {user_input}")
    knowledge_base = load_knowledge_base('knowledge_base.json')
    best_match = find_best_match(user_input, [q['question'] for q in knowledge_base['questions']])
    # print(f"Best match: {best_match}")

    if best_match:
        answer = get_answer_for_question(best_match, knowledge_base)
        return answer, False
    else:
        return "I don't know the answer. Can you teach me?... Type your answer or 'skip' to skip.", True

def teach_chatbot(user_input: str, new_answer: str):
    knowledge_base = load_knowledge_base('knowledge_base.json')
    knowledge_base['questions'].append({"question": user_input, 'answer': new_answer})
    save_knowledge_base('knowledge_base.json', knowledge_base)
    return "Thank you! I learned a new response!"

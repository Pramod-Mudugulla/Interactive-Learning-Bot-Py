# InteractiveLearningBot-Py

## Overview
**InteractiveLearningBot-Py** is a simple chatbot application built using Flask, a lightweight web framework for Python. This chatbot is designed to interact with users by responding to their queries based on a predefined knowledge base. If the chatbot does not know the answer to a question, it prompts the user to teach it a new response, allowing the chatbot to learn and improve over time.

## Features
- **User Interaction**: Users can type messages to the chatbot, which responds in real-time.
- **Knowledge Base**: Utilizes a JSON file to store questions and answers, making it easy to update and expand.
- **Learning Capability**: Prompts users to provide answers when the bot doesn’t know a response.
- **Responsive Design**: Clean and minimalistic user interface.

## Technologies Used
- **Flask**: A micro web framework for Python.
- **HTML/CSS**: For structuring and styling the user interface.
- **JavaScript/jQuery**: For handling user interactions and asynchronous requests.
- **JSON**: For storing the knowledge base.

## Getting Started

### Prerequisites
- Python 3.x
- Flask
- jQuery

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/InteractiveLearningBot-Py.git
   cd InteractiveLearningBot-Py

2. Install the required packages:
   ```bash
   pip install Flask

3. Create a `knowledge_base.json` file in the root directory with the following structure:
   ```json
   {
     "questions": [
       {
         "question": "What is your name?",
         "answer": "I am a chatbot."
       },
       {
         "question": "How can you help me?",
         "answer": "I can answer your questions."
       }
     ]
   }

4. Run the Flask application:
   ```bash
   python app.py

5. Open your web browser and navigate to http://127.0.0.1:5000/.

## Usage
- Type your question in the input box and click "Send" or press Enter to submit.
- If the chatbot does not know the answer, it will ask you to teach it a new response.
- You can provide a new answer, which will be saved to the knowledge base for future interactions.

## Contributing
- Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


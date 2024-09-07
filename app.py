from flask import Flask, render_template, request, jsonify
from learn_from_user_chatbot import get_chatbot_response, teach_chatbot

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.form['user_input']
    response, teach_flag = get_chatbot_response(user_input)
    return jsonify({"response": response, "teach_flag": teach_flag})

@app.route('/teach', methods=['POST'])
def teach():
    user_input = request.form['user_input']
    new_answer = request.form['new_answer']
    response = teach_chatbot(user_input, new_answer)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)

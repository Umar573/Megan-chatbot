from flask import Flask, render_template, request, jsonify
from chat_engine import get_bot_response
import time
from chatterbot import ChatBot

megan = ChatBot(
    "Megan",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    database_uri="sqlite:///db.sqlite3",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "default_response": "I'm still learning. Can you rephrase?",
            "maximum_similarity_threshold": 0.90
        }
    ],
    preprocessors=[
        "chatterbot.preprocessors.clean_whitespace"
    ],
    read_only=False,          # 🔓 Bot is allowed to learn
    learn_response=True       # 🧠 Enable learning from users
)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def get_response():
    user_msg = request.json.get("msg")
    time.sleep(1)  # Typing simulation
    bot_response = get_bot_response(user_msg)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)

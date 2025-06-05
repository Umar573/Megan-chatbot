from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Create and train chatbot
chatbot = ChatBot("Megan")

# Train only once
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.english")

def get_bot_response(user_input):
    response = chatbot.get_response(user_input)
    return str(response)

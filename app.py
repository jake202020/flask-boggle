from flask import Flask, request, render_template, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "{RCxlR^o{^Q<pTUY"

boggle_game = Boggle()

@app.route('/')
def boggle_start():
    """Display page with Boggle Board"""

    board = boggle_game.make_board()
    session['board'] = board

    return render_template('index.html', board=board)

@app.route('/check-word')
def check_word():
    """check submitted guess is a word"""

    guess = request.args['word']
    board = session["board"]
    result = boggle_game.check_valid_word(board, guess)

    return jsonify({"result": result})




# # get random string password with letters, digits, and symbols

# import random
# import string

# def get_random_password_string(length):
#     password_characters = string.ascii_letters + string.digits + string.punctuation
#     password = ''.join(random.choice(password_characters) for i in range(length))
#     print("Random string password is:", password)

# get_random_password_string(16)
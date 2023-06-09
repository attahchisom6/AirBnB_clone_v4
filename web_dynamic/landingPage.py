#!/usr/bin/python3

"""
this is a simple web application intended to render a landing page
"""
from flask import Flask
from flask import render_template

app = Flask(__name__)
port = 5004


@app.route('/MoseLandingPage', strict_slashes=False)
def landingPage():
    """our landing page"""
    return render_template(
            '0-landingPage.html',
            project_name = "Game of the Brave",
            project_url = "https://github.com/attahchisom6/The_Maze-find_your_way_out"
            )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)

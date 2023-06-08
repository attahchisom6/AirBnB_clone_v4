#!/usr/bin/python3

"""
this is a simple web application intended to render a landing page
"""
from flask import Flask
from flask import render_template


app = Flask('__name__')
port=5004
host=localhost

app.route('/MoseLandingPage', strict_slashes=False)
def landingPage():
    """our landing page"""
    return render_template('0-landingPage.html')


if __name__ == '__main__':
    app.run(host=host, port=port)

from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    """Test app.py routes"""

    def setUp(self):
        """to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_boggle_start(self):
        """Make sure there is a board displayed"""
        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)

    # def test_check_word(self):
    #     """Test if there is a json response with a result"""
    #     with self.client:
    #         response = self.client.get('/check-word?word=a')
    #         self.assertTrue(response.json['result'])

    # def test_post_score():
    #     """Test that there is a score in the response from the server"""
    #     response = self.get('/post-score?score=20')
    #     self.assertTrue(response.json['score'])
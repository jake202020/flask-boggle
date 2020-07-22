from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    """Test app.py routes"""

    def test_boggle_start(self):
        self.assertIn(<td>,index.html)
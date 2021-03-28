import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class cred():
    NAME = os.getenv("NAME")
    USER = os.getenv("USER")
    PASS = os.getenv("PASS")
    HOST = os.getenv("HOST")
    PORT= os.getenv("PORT")
    SECRET_KEY = os.getenv("SECRET_KEY")
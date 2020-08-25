from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import PorterStemmer
import glob
import time
import pandas as pd
from nltk import ngrams
from nltk.tokenize import sent_tokenize
import nltk
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB
import tensorflow as tf
from keras.models import Sequential
from keras import layers
from keras.preprocessing.text import Tokenizer
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.metrics import accuracy_score
from tensorflow.keras.models import load_model
import pickle


def predict_sqli(data):
    mymodel = tf.keras.models.load_model('assets/cnn/my_model_cnn.h5')
    myvectorizer = pickle.load(open("assets/cnn/vectorizer_cnn", 'rb'))
    input_val = data
    input_val = [input_val]
    input_val = myvectorizer.transform(input_val).toarray()
    input_val.shape = (1, 64, 64, 1)
    result = mymodel.predict(input_val)
    return result

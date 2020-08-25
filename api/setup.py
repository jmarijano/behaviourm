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
from keras.models import load_model
import pickle
from sklearn.feature_extraction.text import CountVectorizer


def generate_sqli_model():
    df = pd.read_csv('datasets/sqli.csv', encoding='utf-16')
    
    vectorizer = CountVectorizer(
        min_df=2, max_df=0.7, max_features=4096, stop_words=stopwords.words('english'))
    posts = vectorizer.fit_transform(
        df['Sentence'].values.astype('U')).toarray()
    print(posts.shape)
    posts.shape = (4200, 64, 64, 1)
    print(posts.shape)
    X = posts
    y = df['Label']
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42)
    trainX = X_train.copy()
    trainX.shape = (X_train.shape[0], trainX.shape[1]*trainX.shape[2])
    testX = X_test.copy()
    testX.shape = (testX.shape[0], testX.shape[1]*testX.shape[2])
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(
            64, (3, 3), activation=tf.nn.relu, input_shape=(64, 64, 1)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(128, (3, 3), activation=tf.nn.relu),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(256, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(64, activation=tf.nn.relu),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(loss='binary_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])
    model.summary()
    classifier_nn = model.fit(X_train, y_train,
                              epochs=10,
                              verbose=True,
                              validation_data=(X_test, y_test),
                              batch_size=128)
    model.save('assets/cnn/my_model_cnn.h5')
    with open('assets/cnn/vectorizer_cnn', 'wb') as fin:
        pickle.dump(vectorizer, fin)
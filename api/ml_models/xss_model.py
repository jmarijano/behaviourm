import numpy as np
import pandas as pd
import glob
import time
import pandas as pd
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Activation, Conv2D, MaxPooling2D, Flatten, Dropout, MaxPool2D, BatchNormalization
from keras.models import load_model
import os
import matplotlib.pyplot as plt
import keras
import cv2
from sklearn.model_selection import train_test_split
import pickle


def generate_xss_model():
    df = pd.read_csv('datasets/XSS_dataset.csv', encoding='utf-8-sig')
    print(df.columns)
    df = df[df.columns[1:]]
    df.head()
    sentences = df['Sentence'].values
    print(len(sentences))
    arr = np.zeros((len(sentences), 100, 100))

    for i in range(len(sentences)):

        image = convert_to_ascii(sentences[i])

        x = np.asarray(image, dtype='float')
        image = cv2.resize(x, dsize=(100, 100), interpolation=cv2.INTER_CUBIC)
        image /= 128
        arr[i] = image
    print("Input data shape : ", arr.shape)
    data = arr.reshape(arr.shape[0], 100, 100, 1)
    data.shape
    y = df['Label'].values
    trainX, testX, trainY, testY = train_test_split(
        data, y, test_size=0.2, random_state=42)
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(
            64, (3, 3), activation=tf.nn.relu, input_shape=(100, 100, 1)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(256, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(loss='binary_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])
    model.summary()
    model_log = model.fit(trainX, trainY,
                          batch_size=64,
                          epochs=1,
                          verbose=1,
                          validation_data=(testX,  testY),
                          )
    pred = model.predict(testX)
    print(testX)
    #model.save("assets/cnn/xss_cnn.h5")


def convert_to_ascii(sentence):
    sentence_ascii = []
    for i in sentence:
        if(ord(i) < 8222):      # ” : 8221
            if(ord(i) == 8217):  # ’  :  8217
                sentence_ascii.append(134)
            if(ord(i) == 8221):  # ”  :  8221
                sentence_ascii.append(129)
            if(ord(i) == 8220):  # “  :  8220
                sentence_ascii.append(130)
            if(ord(i) == 8216):  # ‘  :  8216
                sentence_ascii.append(131)
            if(ord(i) == 8217):  # ’  :  8217
                sentence_ascii.append(132)
            if(ord(i) == 8211):  # –  :  8211
                sentence_ascii.append(133)
            if (ord(i) <= 128):
                sentence_ascii.append(ord(i))
            else:
                pass
    zer = np.zeros((10000))
    for i in range(len(sentence_ascii)):
        zer[i] = sentence_ascii[i]
    zer.shape = (100, 100)
    return zer


def predict_xss(data):
    data = [data]
    mymodel = tf.keras.models.load_model('assets/cnn/xss_cnn.h5')
    arr = np.zeros((len(data), 100, 100))
    for i in range(len(data)):
        image = convert_to_ascii(data[i])
        x = np.asarray(image, dtype='float')
        image = cv2.resize(x, dsize=(100, 100), interpolation=cv2.INTER_CUBIC)
        image /= 128
        arr[i] = image
    arr = arr.reshape(arr.shape[0], 100, 100, 1)
    return mymodel.predict(arr)

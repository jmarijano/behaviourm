import numpy as np
import random
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle


def char_tokenizer(string):
    tokens = []
    for i in string:
        tokens.append(i)
    return tokens


def generate_password_strength_model():
    #ucitaj podatke iz dataseta
    data = pd.read_csv("datasets/password_strength.csv",
                       ',', error_bad_lines=False)
    data = pd.DataFrame(data)
   
    y = data['strength']
    #sama sifra
    allpasswords = data['password']

    #
    vectorizer = TfidfVectorizer(tokenizer=char_tokenizer)
    X = vectorizer.fit_transform(data['password'].values.astype('U')).toarray()
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42)
    print(vectorizer.get_feature_names())
    lgs = LogisticRegression(penalty='l2', multi_class='ovr')
    lgs.fit(X_train, y_train)
    print(lgs.score(X_test, y_test))

    X_predict = ['111', 'iwhjijwhdjahsd', 'sdfasd##', 'vvbfvbn#bnv231123**', '111111111111111', 'daskjdkasjhdkASDASD!!"#!"$%&%$&$DWFSDFCASD',
                 'uiquiuiiuiuiuiuiuiuiuiuiui', 'flyingwhales', 'josip123123123#', 'asdasd', 'TheHeaviestMatterOfTheUniverse', 'qwertzuiop']
    X_predict = vectorizer.transform(X_predict)
    y_Predict = lgs.predict(X_predict)
    print(y_Predict)
    with open("assets/cnn/password_strength.pkl", "wb") as file:
        pickle.dump(lgs, file)

    with open('assets/cnn/vectorizer_pass_str', 'wb') as file:
        pickle.dump(vectorizer, file)


def predict_password_strength(password):
    with open("assets/cnn/password_strength.pkl", 'rb') as file:
        pickle_model = pickle.load(file)
    vectorizer = pickle.load(open("assets/cnn/vectorizer_pass_str", 'rb'))
    X_predict = password
    X_predict = [X_predict]
    X_predict = vectorizer.transform(X_predict)
    return pickle_model.predict(X_predict)

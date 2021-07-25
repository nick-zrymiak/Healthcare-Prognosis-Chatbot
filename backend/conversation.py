# base chatbot system from: https://www.youtube.com/watch?v=wypVcNIH6D4&list=PLzMcBGfZo4-ndH9FoC4YWHGXG5RZekt-Q&index=1&ab_channel=TechWithTim
# data from: https://www.kaggle.com/neelima98/disease-prediction-using-machine-learning?select=Training.csv

import nltk
from nltk.stem.lancaster import LancasterStemmer
import random
import numpy as np
import tensorflow as tf
from tensorflow.python.framework import ops
import tflearn
import pickle
import os
import pandas as pd

def bag_of_words(s, words):
  bag = [0 for _ in range(len(words))]
  stems = nltk.word_tokenize(s)
  stems = [stemmer.stem(word.lower()) for word in stems]

  for stem in stems:
    for i, word in enumerate(words):
      if word == stem:
        bag[i] = 1

  return np.array(bag)

def chat():
  print('Bot: What are your symptoms?')
  while True:
    response = input('You: ')

    if response.lower() == 'quit':
      break

    tag_probabilities = model.predict([bag_of_words(response, words)])[0]

    possible_symptoms = []
    for i, probability in enumerate(tag_probabilities):
      if probability > .04:
        possible_symptoms.append(labels[i])

    if possible_symptoms:
      potential_messages = causes
      print('Bot: You may have', random.choice(potential_messages))
    else:
      print('Bot: I didn\'t get that, try again.')

if __name__ == '__main__':
    nltk.download('punkt')
    
    training = pd.read_csv('./data/Training.csv')
    symptoms = training.drop('prognosis', axis=1)
    features = symptoms.columns
    symptoms = []
    causes = training['prognosis']
    causes = causes.unique().tolist()
    
    for f in features:
      f = f.replace('_', ' ')
      f = f.replace('.1', '')
      f = f.replace(' (typhos)', '')
      symptoms.append(f)
    
    stemmer = LancasterStemmer()
    
    try:
      with open('model.pickle', 'rb') as f:
        words, labels, training, output = pickle.load(f)
    except:
      words = []
      labels = symptoms
      docs_x = []
      docs_y = []
    
      for pattern in symptoms:
        pattern_words = nltk.word_tokenize(pattern)
        words.extend(pattern_words)
        docs_x.append(pattern_words)
        docs_y.append(pattern)
    
      words = [stemmer.stem(word.lower()) for word in words if word != '?']
      words = sorted(list(set(words))) # set removes duplicates
      labels = sorted(labels)
      training = []
      output = []
      out_empty = [0 for _ in range(len(labels))]
    
      for x, doc in enumerate(docs_x):
        bag = []
        doc_words = [stemmer.stem(word) for word in doc]
    
        for word in words:
          if word in doc_words:
            bag.append(1)
          else:
            bag.append(0)
    
        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1
        training.append(bag)
        output.append(output_row)
      
      training = np.array(training)
      output = np.array(output)
    
      with open('model.pickle', 'wb') as f:
        pickle.dump((words, labels, training, output), f)
    
    # predict tag
    tf.compat.v1.reset_default_graph()
    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(output[0]), activation='softmax')
    net = tflearn.regression(net)
    
    model = tflearn.DNN(net)
    
    model_is_saved = os.path.exists('./data/tag_probabilities.tflearn.meta')
    
    if model_is_saved:
      model.load('./data/tag_probabilities.tflearn')
    else:
      model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
      model.save('./data/tag_probabilities.tflearn')
    
    chat()
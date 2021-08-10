# semantic similarity: https://towardsdatascience.com/how-to-rank-text-content-by-semantic-similarity-4d2419a84c32

import warnings
import numpy as np
import nltk
import pandas as pd
from tensorflow import keras

import gensim.downloader as api
from gensim.utils import simple_preprocess
from gensim.corpora import Dictionary
from gensim.models import TfidfModel
from gensim.models import WordEmbeddingSimilarityIndex
from gensim.similarities import SparseTermSimilarityMatrix
from gensim.similarities import SoftCosineSimilarity

warnings.filterwarnings('ignore')

def preprocess(text):
    try:
        stopwords = set(nltk.corpus.stopwords.words('english'))
    except LookupError:
        nltk.download('stopwords')
        stopwords = set(nltk.corpus.stopwords.words('english'))
    
    return [token for token in simple_preprocess(text, min_len=0, max_len=float('inf')) if token not in stopwords]

def clean_symptoms(raw_symptoms, symptoms):
    for rs in raw_symptoms:
        rs = rs.replace('_', ' ')
        rs = rs.replace('.1', '')
        rs = rs.replace(' (typhos)', '')
        symptoms.append(rs)


def get_doc_similarity_scores(user_msg, corpus, glove):
    similarity_index = WordEmbeddingSimilarityIndex(glove)
    dictionary = Dictionary(corpus + [user_msg])
    tfidf = TfidfModel(dictionary=dictionary)
    similarity_matrix = SparseTermSimilarityMatrix(similarity_index, dictionary, tfidf, nonzero_limit=None)
    user_msg_tf = tfidf[dictionary.doc2bow(user_msg)]
    index = SoftCosineSimilarity(
        tfidf[[dictionary.doc2bow(text) for text in corpus]], 
        similarity_matrix)
    doc_similarity_scores = index[user_msg_tf]
    return doc_similarity_scores, dictionary, similarity_matrix

def chat(user_msg):
    train = pd.read_csv('./data/Training.csv')
    raw_symptoms = train.drop('prognosis', axis=1)
    raw_symptoms = raw_symptoms.columns
    symptoms = []
    
    clean_symptoms(raw_symptoms, symptoms)
    causes = train['prognosis'].unique()
    corpus = [preprocess(symptom) for symptom in symptoms]
    user_msg = preprocess(user_msg)
    
    if 'glove' not in locals():
        glove = api.load("glove-wiki-gigaword-50")
        
    doc_similarity_scores, dictionary, similarity_matrix = get_doc_similarity_scores(user_msg, corpus, glove)
    sorted_indexes = np.argsort(doc_similarity_scores)[::-1]
    
    symptoms = np.zeros(len(raw_symptoms))
    for i in sorted_indexes:
        if doc_similarity_scores[i] > .5:
          symptoms[i] = 1
    symptoms = [symptoms]
    
    prognosis_model = keras.models.load_model('prognosis_model.h5')
    cause_probabilities = prognosis_model.predict(np.array(symptoms))
    cause_probabilities = cause_probabilities[0]
    
    probable_causes = cause_probabilities.argsort()[::-1]
    bot_msg = 'The following may be cause(s) of your symptom(s) with corresponding chances: '
    
    for cause in probable_causes:
      prob = cause_probabilities[cause]
      
      if prob > .05:
        bot_msg += '\n\t' + causes[cause] + ': ' + str(prob*100) + '%'
        
    bot_msg = 'I didn\'t get that, try again.' if bot_msg == '' else bot_msg
    return bot_msg

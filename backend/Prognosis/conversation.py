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

    # build the term dictionary, TF-idf model
    # the search query must be in the dictionary as well in case the terms do not overlap with the documents (we still want similarity of meaning)
    dictionary = Dictionary(corpus + [user_msg])
    tfidf = TfidfModel(dictionary=dictionary)

    # create the term similarity matrix
    similarity_matrix = SparseTermSimilarityMatrix(similarity_index, dictionary, tfidf, nonzero_limit=None)

    # compute Soft Cosine Measure between the user message and the symptoms
    user_msg_tf = tfidf[dictionary.doc2bow(user_msg)]
    index = SoftCosineSimilarity(
        tfidf[[dictionary.doc2bow(text) for text in corpus]], 
        similarity_matrix)
    doc_similarity_scores = index[user_msg_tf]
    return doc_similarity_scores, dictionary, similarity_matrix

def filter_unlikely_symptoms(raw_symptoms, symptoms, doc_similarity_scores):
    sorted_indexes = np.argsort(doc_similarity_scores)[:-1]
    symptoms = np.zeros(len(raw_symptoms))
    for i in sorted_indexes:
        SIMILARITY_THRESH = .6
        if doc_similarity_scores[i] > SIMILARITY_THRESH:
            symptoms[i] = 1
    
    symptoms = [symptoms]
    return symptoms

def filter_prognoses(causes, cause_probabilities, probable_causes, bot_msg):
    for cause in probable_causes:
        prob = cause_probabilities[cause]
        SIMILARITY_THRESH = .05
        if prob > SIMILARITY_THRESH:
            bot_msg += '\n\t' + causes[cause] + ': ' + str(prob * 100) + '%'
    
    return bot_msg

def chat(user_msg):
    # import and download stopwords from NLTK
    try:
        stopwords = set(nltk.corpus.stopwords.words('english'))
    except LookupError:
        nltk.download('stopwords')

    train = pd.read_csv('./data/Training.csv')
    raw_symptoms = train.drop('prognosis', axis=1)
    raw_symptoms = raw_symptoms.columns
    symptoms = []
    clean_symptoms(raw_symptoms, symptoms)
    causes = train['prognosis'].unique()

    corpus = [preprocess(symptom) for symptom in symptoms]
    user_msg = preprocess(user_msg)
    
    # download and/or load the GloVe word vector embeddings
    if 'glove' not in locals(): # only load if not already in memory
        glove = api.load('glove-wiki-gigaword-50')
        
    doc_similarity_scores, dictionary, similarity_matrix = get_doc_similarity_scores(user_msg, corpus, glove)
    symptoms = filter_unlikely_symptoms(raw_symptoms, symptoms, doc_similarity_scores)
    
    min_one_symptom_recognized = np.isin(1, symptoms[0])
    bot_msg = 'The following may be cause(s) of your symptom(s) with corresponding chances: '
    if min_one_symptom_recognized:    
        prognosis_model = keras.models.load_model('prognosis_model.h5')
        cause_probabilities = prognosis_model.predict(np.array(symptoms))
        cause_probabilities = cause_probabilities[0]
        probable_causes = cause_probabilities.argsort()[::-1] # sort in descending order
        bot_msg = filter_prognoses(causes, cause_probabilities, probable_causes, bot_msg)
        
        low_confidence_for_all_causes = bot_msg == 'The following may be cause(s) of your symptom(s) with corresponding chances: '
        if low_confidence_for_all_causes:
            bot_msg = 'I don\'t have enough information to give an accurate prediction with the symptoms you stated.'
    else:
        bot_msg = 'I didn\'t get that, try again.' 
    
    return bot_msg

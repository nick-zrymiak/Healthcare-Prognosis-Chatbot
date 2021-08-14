import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import cv2
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tqdm import tqdm
import os
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, TensorBoard, ModelCheckpoint
from sklearn.metrics import classification_report,confusion_matrix
import ipywidgets as widgets
import io
from PIL import Image
from IPython.display import display,clear_output
from warnings import filterwarnings
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
        

# DATA PREPERATION

labels = ['glioma_tumor','no_tumor','meningioma_tumor','pituitary_tumor']

X_train = []
y_train = []
image_size = 150
for i in labels:
    folderPath = os.path.join('../input/brain-tumor-classification-mri','Training',i)
    for j in tqdm(os.listdir(folderPath)):
        img = cv2.imread(os.path.join(folderPath,j))
        img = cv2.resize(img,(image_size, image_size))
        X_train.append(img)
        y_train.append(i)
        
for i in labels:
    folderPath = os.path.join('../input/brain-tumor-classification-mri','Testing',i)
    for j in tqdm(os.listdir(folderPath)):
        img = cv2.imread(os.path.join(folderPath,j))
        img = cv2.resize(img,(image_size,image_size))
        X_train.append(img)
        y_train.append(i)
        
X_train = np.array(X_train)
y_train = np.array(y_train)

# Dividing the data into test and train sets
X_train,X_test,y_train,y_test = train_test_split(X_train,y_train, test_size=0.3,random_state=1)

# One hot encoding the data
y_train_new = []
for i in y_train:
    y_train_new.append(labels.index(i))
y_train = y_train_new
y_train = tf.keras.utils.to_categorical(y_train)


y_test_new = []
for i in y_test:
    y_test_new.append(labels.index(i))
y_test = y_test_new
y_test = tf.keras.utils.to_categorical(y_test)

# Since the data is small, I take inspiration from existing approaches and implemented a Transfer learning methodology.

efficientNet = EfficientNetB0(weights='imagenet',include_top=False,input_shape=(image_size,image_size,3))

# Setting up model
''' Utilizing:
    Softmax Activatation , tried relu also, but got better results with softmax. 
'''
model = effnet.output
model = tf.keras.layers.GlobalAveragePooling2D()(model)
model = tf.keras.layers.Dropout(rate=0.5)(model)
model = tf.keras.layers.Dense(4,activation='softmax')(model)
model = tf.keras.models.Model(inputs=effnet.input, outputs = model)

''' Utilizing:
    Entropy loss as the loss function
    Adam as the optimizator of choice
'''
model.compile(loss='categorical_crossentropy',optimizer = 'Adam', metrics= ['accuracy'])

# Callbacks used

tensorBoard = TensorBoard(log_dir = 'logs')
checkPoint = ModelCheckpoint("effnet.h5",monitor="val_accuracy",save_best_only=True,mode="auto",verbose=1)
lrReducer = ReduceLROnPlateau(monitor = 'val_accuracy', factor = 0.3, patience = 2, min_delta = 0.001,
                              mode='auto',verbose=1)


# Training of the Model

history = model.fit(X_train,y_train,validation_split=0.1, epochs =12, verbose=1, batch_size=40,
                   callbacks=[tensorBoard,checkPoint,lrReducer])


# Dispalying the training vs validation loss and accuracy

epochs = [i for i in range(12)]
fig, axes = plt.subplots(1,2,figsize=(14,7))
train_acc = history.history['accuracy']
train_loss = history.history['loss']
val_acc = history.history['val_accuracy']
val_loss = history.history['val_loss']

fig.text(s='Epochs vs. Training and Validation Accuracy/Loss',size=18,fontweight='bold',
             fontname='monospace',color="black",y=1,x=0.28,alpha=0.8)

sns.despine()
axes[0].plot(epochs, train_acc, marker='o',markerfacecolor="blue",color="orange",
           label = 'Training Accuracy')
axes[0].plot(epochs, val_acc, marker='o',markerfacecolor="blue",color="orange",
           label = 'Validation Accuracy')
axes[0].legend()
axes[0].set_xlabel('Epochs')
axes[0].set_ylabel('Accuracy')

sns.despine()
axes[1].plot(epochs, train_loss, marker='o',markerfacecolor="blue",color="orange",
           label ='Training Loss')
axes[1].plot(epochs, val_loss, marker='o',markerfacecolor="blue",color="orange",
           label = 'Validation Loss')
axes[1].legend()
axes[1].set_xlabel('Epochs')
axes[1].set_ylabel('Loss')

fig.show()


# Testing of the Model

pred = model.predict(X_test)
pred = np.argmax(pred,axis=1)
y_test_new = np.argmax(y_test,axis=1)

# Converting various types of cancers to a single cancer label (0: Cancer, 1: No-Cancer)
for n, i in enumerate(pred):
    if (i == 2) | (i == 3):
        pred[n] = 0
        
for n, i in enumerate(y_test_new):
    if (i == 2) | (i == 3):
        y_test_new[n] = 0


# Model compitency check
print(classification_report(y_test_new,pred))

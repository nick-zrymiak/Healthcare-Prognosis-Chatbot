# Healthcare-Analyser-and-Chatbot

Detecting heart problems in the early stage is crucial to save ones' life. Therefore here we attempt to detect a patients risk of heart disease by accessing various user inputs

<br>

## Get Started:

### First Clone/Download the repo

### Run the <u>BACKEND</u> with PIPENV:

#### `cd Healthcare-Analyser-and-Chatbot/backend`

#### activate virtual environment (see details below on how to)

#### `pipenv install`

#### `cd server`

#### `python manage.py runserver`

<br>

### Run the <u>FRONTEND</u> with NPM:

#### `cd Healthcare-Analyser-and-Chatbot/client`

#### `npm install`

#### `npm start`

<br>
Open http://localhost:5000 to view it in the browser.
<br>
<br>
## To run the disease predictor:

#### `cd Healthcare-Analyser-and-Chatbot/MRI`

#### `python predictor.py`

<br>
<br>

### Activate virtual Environment for Windows:

    -Create virtual environment files:
    	"py -3 -m venv .venv"

    -Install "pipnv" wrapper for python virtual environment
    	"pip3 install -U pip virtualenv"

    -ACTIVATE your pipenv wrapper by either:
    	1)"pipenv shell"
    	2) OR Select python interpreter > "pip3" from ".venv>Scripts>pip3.eve"

    -DEACTIVATE virtual environment command:
    	"deactivate"

### Alternative method :

    -Step 1
    	"pip3 install -U pip virtualenv"

    -Step 2
    	"virtualenv --system-site-packages -p python ./venv"
    	"or"
    	"virtualenv --system-site-packages -p python3 ./venv"

    -Step 3
    	".\venv\Scripts\activate"

For more details on how to set up python virtual environment using VS-Code:
https://stackoverflow.com/questions/8921188issue-with-virtualenv-cannot-activate
https://code.visualstudio.com/docs/python/python-tutorial
https://www.jetbrains.com/help/pycharm/pipenv.html

## Contributers:

### Awshaf | Nick | Adam | Laksh | Hazem

# Healthcare-Prognosis-Chatbot

Detecting heart, brain and general health problems.

<br>

## Get Started:

### Clone the repo

### Run the backend:

#### `cd Healthcare-Prognosis-Chatbot/backend`

#### Activate virtual environment (see details at the bottom of the README)

#### `pipenv install`

#### `cd server`

#### `python manage.py runserver`

<br>

### Run the frontend(Can be done without backend):

#### `cd Healthcare-Prognosis-Chatbot/client`

#### `npm install`

#### `npm start`

<br>
Open http://localhost:5000 to view the web app in your browser.
<br>
<br>

## Run the disease predictor:

#### `cd Healthcare-Prognosis-Chatbot/MRI`

#### `pip install -r requirements.txt`

#### `python predictor.py`

<br>
<br>

### Activate virtual environment for Windows:

    - Create virtual environment files:
    	py -3 -m venv .venv

    -Install pipnv wrapper for Python virtual environment
    	pip3 install -U pip virtualenv

    - Activate the pipenv wrapper by either:
    	1) pipenv shell
    	2) OR Select python interpreter > "pip3" from ".venv>Scripts>pip3.eve"

    - Deactivate virtual environment command:
    	deactivate

### Alternative method :

    1
    	"pip3 install -U pip virtualenv"

    2
    	virtualenv --system-site-packages -p python ./venv
    	OR
    	virtualenv --system-site-packages -p python3 ./venv

    3
    	.\venv\Scripts\activate

For more details on how to set up python virtual environment using VS-Code:
https://stackoverflow.com/questions/8921188issue-with-virtualenv-cannot-activate
https://code.visualstudio.com/docs/python/python-tutorial
https://www.jetbrains.com/help/pycharm/pipenv.html

## Contributers:

### Awshaf | Nick | Adam | Laksh | Hazem

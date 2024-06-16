# cube3-official-agent

This agent allows you to ask questions and evaluate the risk associated with wallets and smart contracts in real-time. This allows you to mitigate the risk of falling victim to fraud.

Built with [Hive Agent Kit](https://github.com/hivenetwork-ai/hive-agent-py).


## Project Requirements
- Python >= 3.11

## Setup
- Create a new file called .env
- Copy the contents of [.env.example](.env.example) into your new .env file
- API keys for third party tools are not provided.
  - `OPENAI_API_KEY` from OpenAI
- Create a virtual Python environment
```
$ python -m venv ./venv
```
- Activate the Python virtual env.
  - Windows:
    - In cmd.exe: `venv\Scripts\activate.bat`
    - In PowerShell: `venv\Scripts\Activate.ps1`
  - Unix: `source venv/bin/activate`
- Install dependencies.
```
$ pip install -r requirements.txt
```

## Usage
- Run it
```
(venv) $ python main.py
```
- Test your agent by calling it Chat API endpoint, `/api/chat`, to see the result:

```
curl --location 'localhost:8000/api/chat' \
--header 'Content-Type: application/json' \
--data '{ "messages": [{ "role": "user", "content": "TODO" }] }'
```

## Testing
- Install the dev dependencies:
```
(venv) $ pip install -r requirements-dev.txt
```
- Run the test suite
```
$ pytest
```
- Run tests for a specific module
```
$ pytest tests/path/to/test_module.py
```
- Run with verbose output:
```
$ pytest -v
```
- Run with a detailed output of each test (including print statements):
```
$ pytest -s
```

## More
- Powered by [Hive Network](https://hivenetwork.ai).


# News Agents
This News Agent leverages a news API to fetch and use news from a wide array of sources. 
It processes these inputs to deliver comprehensive, contextual, and well-researched responses tailored to user queries. 
Whether you're seeking the latest headlines, in-depth analyses, or specific topic updates, this agent ensures you receive accurate and timely information.

Built with [Hive Agent Kit](https://github.com/hivenetwork-ai/hive-agent-py).


## Project Requirements
- Python >= 3.11

## Setup
- Create a new file called .env
- Copy the contents of [.env.example](.env.example) into your new .env file
- API keys for third party tools are not provided.
  - `OPENAI_API_KEY` from OpenAI
  
  You can also use other LLM types, in which case you can add the corresponding API keys
  - `ANTHROPIC_API_KEY` from Anthropic
  - `MISTRAL_API_KEY` from Mistral 
  - Ollama models can also be used
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
curl --location 'localhost:8000/api/v1/chat' \
--header 'Content-Type: application/json' \
--data '{
    "user_id": "user123",
    "session_id": "session123",
    "chat_data": {
        "messages": [
            { "role": "user", "content": "What's going on in Canada right now?" }
        ]
    }
}'
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

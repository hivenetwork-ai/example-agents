# bitquery-official-agent

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
1. Create schema
```py
!mkdir data
!gql-cli https://streaming.bitquery.io/graphql --headers "Authorization:Bearer TOKEN" --print-schema --verbose > bitquery-graphql.txt
```

# AAVE agent

This agent provides lending and borrowing of cryptocurrencies from the AAVE pool

## Environment Setup
You need to specify an `RPC_URL` and `PRIVATE_KEY`  in a _.env_ file in this directory.

Make a copy of the [.env.example](.env.example) file and rename it to _.env_.

The `RPC_URL` can come from an Infura key.

The `PRIVATE_KEY` is your digital wallet's private key. 

# Usage

Call the API endpoint, `/api/v1/chat`, to see the result:
```sh
curl --location 'localhost:8000/api/v1/chat' \
--header 'Content-Type: application/json' \
--data '{
    "user_id": "user123",
    "session_id": "session123",
    "chat_data": {
        "messages": [
            { "role": "user", "content": "Borrow 5 ETH from the AAVE lending pool, with an interest rate of 2%" }
        ]
    }
}'
```
## Setup

Make sure the .env file file is created by doing the following: 

- Create a new file called .env
- Copy the contents of [.env.example](.env.example) into your new .env file

Then create a virtual Python environment:
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



### Testing

- Make sure you're in the `lend_borrow_agent` directory:
```sh
$ pytest test/test_lend_borrow.py
```
- Run the test suite:
```sh
$ pytest
```
- Run tests for a specific module:
```sh
$ pytest tests/path/to/test_module.py
```
- Run with verbose output:
```sh
$ pytest -v
```
- Run with a detailed output of each test (including print statements):
```sh
$ pytest -s
```

## Learn More

https://hivenetwork.ai

import asyncio
import http.client
import logging
import requests

from dotenv import load_dotenv

from hive_swarm import dapp_swarm

# http.client.HTTPConnection.debuglevel = 1
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger("http.client")
# logger.setLevel(logging.DEBUG)
# handler = logging.StreamHandler()
# logger.addHandler(handler)


load_dotenv()


async def main():
    print(
        "Welcome to the dApp Builder Swarm!\nVisit https://HiveNetwork.ai to learn more.\n\nType 'exit' to quit.\n"
    )

    while True:
        prompt = input("\n\nEnter your prompt: \n\n")
        if prompt.lower() == "exit":
            break
        response = await dapp_swarm.chat(prompt)
        print(response)


if __name__ == "__main__":
    asyncio.run(main())

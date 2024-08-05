import asyncio

from hive_swarm import dapp_swarm

from dotenv import load_dotenv
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

import asyncio

from hive_agent import HiveAgent, Config, OpenAILLM, llm_from_config
from hive_swarm.agents.instructions import PROJECT_MANAGER_INSTRUCTION

from dotenv import load_dotenv

load_dotenv()

# PROJECT_MANAGER_INSTRUCTION = (
#     "You are a project manager on a software development team and you should provide guidance, "
#     "planning, clarity and instruction on how to build the project."
# )


config_path = "./hive_swarm/agents/project_manager/hive_config.toml"
config = Config(config_path=config_path)
llm = llm_from_config(config)
print(f"in project manager, llm is {type(llm)}")
gpt = OpenAILLM(llm=llm)

pm_agent = HiveAgent(
    name="Project Manager Agent",
    description="This agent acts like a Project Manager on a team",
    instruction=PROJECT_MANAGER_INSTRUCTION,
    role="project manager",
    functions=[],
    llm=gpt,
    config_path=config_path,
)


if __name__ == "__main__":
    pm_agent.run()
#     asyncio.run(pm_agent.chat("build an NFT trading dapp"))


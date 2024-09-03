from hive_agent import HiveAgent
from hive_agent.llms.openai import OpenAILLM
from hive_agent.config import Config
from hive_agent.llms.utils import llm_from_config

from hive_swarm.agents.instructions import PROJECT_MANAGER_INSTRUCTION

from dotenv import load_dotenv

load_dotenv()


config_path = "./hive_swarm/agents/project_manager/hive_config.toml"
config = Config(config_path=config_path)
llm = llm_from_config(config)
gpt = OpenAILLM(llm=llm)

pm_agent = HiveAgent(
    name="Project Manager Agent",
    description="This agent acts like a Project Manager on a team",
    instruction=PROJECT_MANAGER_INSTRUCTION,
    role="project manager",
    functions=[],
    llm=gpt,
    config_path=config_path,
    swarm_mode=True,
)


if __name__ == "__main__":
    pm_agent.run()

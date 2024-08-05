from hive_agent import HiveAgent, ClaudeLLM

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import FRONTEND_DEVELOPER_INSTRUCTION

from dotenv import load_dotenv
load_dotenv()


claude = ClaudeLLM()

frontend_developer_agent = HiveAgent(
    name="Frontend Developer Agent",
    description="This agent acts like a Frontend Software Developer on a team and can write React code.",
    instruction=FRONTEND_DEVELOPER_INSTRUCTION,
    role="frontend developer",
    functions=[save_to_file],
    llm=claude,
    config_path="./hive_swarm/agents/frontend_developer/hive_config.toml",
)

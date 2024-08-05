from hive_agent import HiveAgent, ClaudeLLM

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import BACKEND_DEVELOPER_INSTRUCTION

from dotenv import load_dotenv
load_dotenv()

claude = ClaudeLLM()

backend_developer_agent = HiveAgent(
    name="Backend Developer Agent",
    description="This agent acts like a Backend Software Developer on a team and can write server code.",
    instruction=BACKEND_DEVELOPER_INSTRUCTION,
    role="backend developer",
    functions=[save_to_file],
    llm=claude,
    config_path="./hive_swarm/agents/backend_developer/hive_config.toml",
)

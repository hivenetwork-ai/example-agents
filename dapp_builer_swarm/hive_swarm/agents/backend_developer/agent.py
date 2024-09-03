from hive_agent import HiveAgent
from hive_agent.llms.claude import ClaudeLLM
from hive_agent.config import Config
from hive_agent.llms.utils import llm_from_config
from hive_agent.utils import tools_from_funcs

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import BACKEND_DEVELOPER_INSTRUCTION

from dotenv import load_dotenv
load_dotenv()

config_path = "./hive_swarm/agents/backend_developer/hive_config.toml"
config = Config(config_path=config_path)
llm = llm_from_config(config)
tools = tools_from_funcs([save_to_file])
claude = ClaudeLLM(llm=llm, tools=tools)

backend_developer_agent = HiveAgent(
    name="Backend Developer Agent",
    description="This agent acts like a Backend Software Developer on a team and can write server code.",
    instruction=BACKEND_DEVELOPER_INSTRUCTION,
    role="backend developer",
    functions=[save_to_file],
    llm=claude,
    config_path=config_path,
    swarm_mode=True,
)

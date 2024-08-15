from hive_agent import HiveAgent, ClaudeLLM, Config, llm_from_config, tools_from_funcs

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import BACKEND_DEVELOPER_INSTRUCTION

from dotenv import load_dotenv
load_dotenv()

config_path = "./hive_swarm/agents/backend_developer/hive_config.toml"
config = Config(config_path=config_path)
llm = llm_from_config(config)
print(f"in hive_swarm/agents/backend_developer, llm is {type(llm)}")
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
)

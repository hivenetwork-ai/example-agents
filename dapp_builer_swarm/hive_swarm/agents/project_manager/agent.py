from hive_agent import HiveAgent
from hive_swarm.agents.instructions import PROJECT_MANAGER_INSTRUCTION

pm_agent = HiveAgent(
    name="Project Manager Agent",
    description="This agent acts like a Project Manager on a team",
    instruction=PROJECT_MANAGER_INSTRUCTION,
    role="project manager",
    functions=[],
    config_path="./hive_swarm/agents/project_manager/hive_config.toml",
)

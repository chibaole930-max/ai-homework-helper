import asyncio
import sys

from auto_updater.agent import agent

if __name__ == "__main__":
    asyncio.run(agent.start())
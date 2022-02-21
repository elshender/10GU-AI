#!/bin/bash
set -e

# Build a configuration file from environment variables.
DockerBuildConfig.sh > config.json

string="\rConfig.json Write complete.\r"
echo -e "$string"
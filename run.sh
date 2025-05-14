#!/bin/bash

# Contract Assessment Application Runner Script

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Contract Assessment Application${NC}"
echo "==============================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Function to display help
show_help() {
    echo "Usage: ./run.sh [OPTION]"
    echo "Options:"
    echo "  start       Start the application"
    echo "  stop        Stop the application"
    echo "  restart     Restart the application"
    echo "  logs        Show logs"
    echo "  build       Rebuild the application"
    echo "  clean       Remove all containers and volumes"
    echo "  help        Show this help message"
}

# Start the application
start_app() {
    echo -e "${YELLOW}Starting the Contract Assessment Application...${NC}"
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Application started successfully!${NC}"
        echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
        echo -e "Backend API: ${GREEN}http://localhost:5000${NC}"
    else
        echo -e "${RED}Failed to start the application.${NC}"
    fi
}

# Stop the application
stop_app() {
    echo -e "${YELLOW}Stopping the Contract Assessment Application...${NC}"
    docker-compose down
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Application stopped successfully!${NC}"
    else
        echo -e "${RED}Failed to stop the application.${NC}"
    fi
}

# Show logs
show_logs() {
    echo -e "${YELLOW}Showing logs...${NC}"
    docker-compose logs -f
}

# Rebuild the application
rebuild_app() {
    echo -e "${YELLOW}Rebuilding the Contract Assessment Application...${NC}"
    docker-compose build --no-cache
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Application rebuilt successfully!${NC}"
        echo -e "${YELLOW}Starting the application...${NC}"
        docker-compose up -d
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Application started successfully!${NC}"
            echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
            echo -e "Backend API: ${GREEN}http://localhost:5000${NC}"
        else
            echo -e "${RED}Failed to start the application.${NC}"
        fi
    else
        echo -e "${RED}Failed to rebuild the application.${NC}"
    fi
}

# Clean up
clean_app() {
    echo -e "${YELLOW}Removing all containers and volumes...${NC}"
    docker-compose down -v
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Cleanup completed successfully!${NC}"
    else
        echo -e "${RED}Failed to clean up.${NC}"
    fi
}

# Parse command line arguments
case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        stop_app
        start_app
        ;;
    logs)
        show_logs
        ;;
    build)
        rebuild_app
        ;;
    clean)
        clean_app
        ;;
    help|*)
        show_help
        ;;
esac

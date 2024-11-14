# Step 1: Use an official Node.js image as the base to install Bun (since Bun requires Node and other system dependencies)
FROM node:20 AS build

# Step 2: Install dependencies
RUN apt-get update && apt-get install -y curl

# Step 3: Install Bun (replace version if needed)
RUN curl -fsSL https://bun.sh/install | bash

# Step 4: Set up Bun in PATH for future commands
ENV PATH="/root/.bun/bin:${PATH}"

# Step 5: Set the working directory
WORKDIR /app

# Step 6: Copy package files and install dependencies
COPY package.json bun.lockb ./  
RUN bun install

# Step 7: Copy the rest of the application files
COPY . .

# Step 8: Expose the port that the application will run on
EXPOSE 4000

# Step 9: Start the application
CMD ["bun", "index.ts"]

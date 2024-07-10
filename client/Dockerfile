# Use the official Node.js image
FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port your client is running on
EXPOSE 3000

# Serve the React app using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

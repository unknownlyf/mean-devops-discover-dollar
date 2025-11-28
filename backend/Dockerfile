FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy rest of the backend source code
COPY . .

# Environment & port
ENV PORT=8080
EXPOSE 8080

# Start backend server
CMD ["npm", "start"]

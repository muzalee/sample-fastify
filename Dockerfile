FROM node:20-alpine

# Install tini to handle signals (to work as PID 1)
RUN apk add --no-cache tini

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup -u 1001
USER appuser

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# Use tini to run the application as PID 1, which ensures correct signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Run the app
CMD ["npm", "run", "start"]

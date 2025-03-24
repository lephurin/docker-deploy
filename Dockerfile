# Step 1: Use Node.js as the base image
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Step 4: Copy the rest of the project files
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Use a lightweight image for production
FROM node:18-alpine AS runner

# Step 7: Set working directory
WORKDIR /app

# Step 8: Copy built files from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .

# Step 9: Install only production dependencies
RUN npm install --production

# Step 10: Expose port and start the app
EXPOSE 3000
CMD ["npm", "run", "start"]

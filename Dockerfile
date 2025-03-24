# Step 1: Base image for building
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Step 4: Copy project files
COPY . .

# Step 5: Build-time environment variables
ARG NEXT_PUBLIC_CLIENT_VERSION
ENV NEXT_PUBLIC_CLIENT_VERSION=${NEXT_PUBLIC_CLIENT_VERSION}

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Production image
FROM node:18-alpine AS runner

# Step 8: Set working directory
WORKDIR /app

# Step 9: Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Step 10: Copy necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Step 11: Set environment and user
USER nextjs

# Step 12: Runtime environment variables
ARG NEXT_PUBLIC_CLIENT_VERSION
ENV NEXT_PUBLIC_CLIENT_VERSION=${NEXT_PUBLIC_CLIENT_VERSION}
ENV PORT 3000
ENV HOSTNAME localhost

# Step 13: Expose port
EXPOSE 3000

# Step 14: Start the application
CMD ["node", "server.js"]
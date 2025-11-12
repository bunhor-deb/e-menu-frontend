# Stage 1: Build
FROM node:20-alpine3.19 AS builder

WORKDIR /app

# Update Alpine security patches only (lightweight update without full upgrade)
#RUN apk update --no-cache && apk upgrade --no-cache

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy project files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production Runtime
FROM node:20.12.2-slim AS runner

WORKDIR /app

# Update system packages to patch vulnerabilities
#RUN apt-get update && \
    #apt-get upgrade -y && \
    #apt-get clean && \
    #rm -rf /var/lib/apt/lists/*

# Set production environment
ENV NODE_ENV=production

# Copy package files and install only production dependencies in the runtime image.
# This avoids copying dev dependencies from the builder (smaller surface and fewer vulns).
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm ci --only=production --legacy-peer-deps

# Copy built app from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the Next.js app
CMD ["npm", "run", "start"]

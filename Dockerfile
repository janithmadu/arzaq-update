# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for installing dependencies
COPY package.json package-lock.json ./

# Step 4: Install production dependencies
RUN npm install --production

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Set environment variables for production
# These are placeholder values; ensure they are provided during build or runtime.
ARG DATABASE_URL
ARG KINDE_ISSUER_URL
ARG KINDE_CLIENT_ID
ARG KINDE_CLIENT_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV KINDE_ISSUER_URL=$KINDE_ISSUER_URL
ENV KINDE_CLIENT_ID=$KINDE_CLIENT_ID
ENV KINDE_CLIENT_SECRET=$KINDE_CLIENT_SECRET
ENV NODE_ENV=production

# Step 7: Generate Prisma Client
RUN npx prisma generate

# Step 8: Run Prisma migrations
RUN npx prisma migrate deploy

# Step 9: Build the Next.js app
RUN npm run build

# Step 10: Expose the port used by Next.js (default is 3000)
EXPOSE 3000

# Step 11: Start the app
CMD ["npm", "start"]

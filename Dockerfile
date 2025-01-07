# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for installing dependencies
COPY package.json package-lock.json ./

RUN rm -rf node_modules
RUN rm package-lock.json

# Step 4: Install production dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Generate Prisma Client
RUN npx prisma generate

# Step 7: Run Prisma migrations
RUN npx prisma migrate deploy

# Step 8: Build the Next.js app
RUN npm run build

# Step 9: Expose the port used by Next.js (default is 3000)
EXPOSE 3000

# Step 10: Define the environment variable for production
ENV NODE_ENV=production

# Step 11: Start the app
CMD ["npm", "start"]

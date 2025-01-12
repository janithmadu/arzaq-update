# Step 1: Use an official Node.js runtime as the base image
FROM node:20-alpine

# Step 2: Install required libraries
RUN apk update
RUN apk add openssl

RUN apk update && apk add --no-cache \
    python3 \
    build-base
# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for installing dependencies
COPY package.json ./
RUN npm i --save-dev @types/nprogress
RUN rm -rf package-lock.json node_modules
#RUN npm cache clean --force
RUN npm install --production
RUN npm install tailwindcss postcss autoprefixer
RUN npm install --save-dev @types/google.maps



# Step 4: Install production dependencies
RUN npm install --production


# Step 4: Install production dependencies

# Step 5: Copy the rest of the application files
COPY . .



# Step 6: Set environment variables for production
# These are placeholder values; ensure they are provided during build or runtime.
ARG DATABASE_URL
ARG KINDE_ISSUER_URL
ARG KINDE_CLIENT_ID
ARG KINDE_CLIENT_SECRET


ARG KINDE_SITE_URL
ARG KINDE_POST_LOGOUT_REDIRECT_URL
ARG KINDE_POST_LOGIN_REDIRECT_URL
ARG MAINURL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_UPLOAD_PRESET
ARG NEXT_PUBLIC_CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG KINDE_DOMAIN 
ARG KINDE_MANAGEMENT_CLIENT_ID
ARG KINDE_MANAGEMENT_CLIENT_SECRET



ENV DATABASE_URL=$DATABASE_URL
ENV KINDE_ISSUER_URL=$KINDE_ISSUER_URL
ENV KINDE_CLIENT_ID=$KINDE_CLIENT_ID
ENV KINDE_CLIENT_SECRET=$KINDE_CLIENT_SECRET

ENV NODE_ENV=production


ENV KINDE_SITE_URL=$KINDE_SITE_URL
ENV KINDE_POST_LOGOUT_REDIRECT_URL=$KINDE_POST_LOGOUT_REDIRECT_URL
ENV KINDE_POST_LOGIN_REDIRECT_URL=$KINDE_POST_LOGIN_REDIRECT_URL
ENV MAINURL=$MAINURL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_UPLOAD_PRESET=$NEXT_PUBLIC_UPLOAD_PRESET
ENV NEXT_PUBLIC_CLOUDINARY_API_KEY=$NEXT_PUBLIC_CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV KINDE_DOMAIN=$KINDE_DOMAIN
ENV KINDE_MANAGEMENT_CLIENT_ID=$KINDE_MANAGEMENT_CLIENT_ID
ENV KINDE_MANAGEMENT_CLIENT_SECRET=$KINDE_MANAGEMENT_CLIENT_SECRET
ENV NODE_ENV=production




# Step 7: Generate Prisma Client
RUN npx prisma generate


# Step 9: Build the Next.js app
RUN npm run build

# Step 10: Expose the port used by Next.js (default is 3000)
EXPOSE 3000

# Step 11: Start the app
CMD ["npm", "start"]


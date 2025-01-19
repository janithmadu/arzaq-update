import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "gravatar.com",
      "res.cloudinary.com",
    ], // Add this line
  },
  output: "standalone",

  env: {
    KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://www.q8arzaq.com`,
    KINDE_POST_LOGOUT_REDIRECT_URL:
      process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://www.q8arzaq.com`,
    KINDE_POST_LOGIN_REDIRECT_URL:
      process.env.KINDE_POST_LOGIN_REDIRECT_URL ?? `https://www.q8arzaq.com`,
  },
};

export default withNextIntl(nextConfig);

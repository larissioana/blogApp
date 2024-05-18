/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
    webpack: (config, { dev, isServer }) => {
        // Disable source maps in production
        if (!dev) {
            config.devtool = false;
        }
        return config;
    },
}

module.exports = nextConfig

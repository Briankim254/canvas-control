/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
            },
            {
                hostname: 'images.unsplash.com', // Added new remote host
            }
        ],
    },
};

export default nextConfig;

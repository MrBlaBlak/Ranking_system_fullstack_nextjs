/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mui/x-charts'],
    pageExtensions: ['ts', 'tsx'], // Replace `jsx?` with `tsx?`
}

module.exports = nextConfig

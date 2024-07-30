/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    transpilePackages: ['@mui/x-charts'],
    pageExtensions: ['ts', 'tsx'], // Replace `jsx?` with `tsx?`
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig

# Titanfall 2 Balanced Teams Ranking System
## Introduction
Welcome to the Titanfall 2 Balanced Teams Ranking System! This project aims to create a balanced team selection and ranking system for the first-person shooter (FPS) game Titanfall 2. The system focuses on ensuring fair and competitive matches by intelligently forming teams based on players' Matchmaking Ratings (MMR) and implementing a comprehensive ranking algorithm.

In Titanfall 2's "Capture the Flag" mode, two teams of five players each compete to capture more flags than their opponents. The game features powerful titans, colossal machines that can be summoned onto the battlefield periodically, adding an extra layer of strategy to the gameplay.

## Features
### Team Formation
The ranking system initiates by selecting two teams based on the MMR of individual players. The allocation of players to teams is done in a way that minimizes the MMR difference, ensuring teams are as balanced as possible.

### Ranking Algorithm
After each match, the system collects player statistics, determines the winner, and assigns or deducts points accordingly. The ranking algorithm takes into account the following factors:

* **Match Outcome:** The greater the difference in flags captured between the winning and losing teams, the more points are awarded or deducted.

* **Winstreak:** Players receive additional points based on the percentage of victories in their last 10 matches, encouraging consistent performance.

* **Match Resolution:** Points are influenced by whether the match ended within the regulation time or resulted in a Sudden Death situation.

### Player Statistics Tracking
The system continuously monitors player statistics, allowing users to explore various insightful summaries, including:

* **Eliminations and Flag Captures:** Detailed information on the number of eliminations and flag captures on specific maps, along with average and best performances.

* **Titan Effectiveness:** Insights into players' efficiency when using different titans.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

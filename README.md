# Titanfall 2 Balanced Teams Ranking System
## Introduction
Welcome to the Titanfall 2 Balanced Teams Ranking System! This project aims to create a balanced team selection and ranking system for the first-person shooter (FPS) game Titanfall 2. The system focuses on ensuring fair and competitive matches by intelligently forming teams based on players' Matchmaking Ratings (MMR) and implementing a comprehensive ranking algorithm.
The application is live on Vercel for testing at this link 

https://ranking-system-fullstack-nextjs-mb2v8dq4a-mrblablaks-projects.vercel.app/

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

## More information
For more explanation you can watch video below (presented on the sister project in Java Spring MVC)

https://www.youtube.com/watch?v=UoY1Vs-6aJ4

## Getting Started

### Configuring Database Connection

The DATABASE_URL environment variable in the project configuration specifies the connection details for the database. Follow the steps below to modify it for starting project:

Locate the file where the DATABASE_URL environment variable is declared. This file is named .env 

Find the line that starts with DATABASE_URL in the configuration file.
Update the connection details according to your new project's database setup. 
If you're using MySQL, modify the URL to match your MySQL server details:

`DATABASE_URL="mysql://username:password@host:port/database_name"`

Replace username, password, host, port, and database_name with your MySQL server credentials and database name. 
After making the necessary modifications, save the configuration file.

Here's an example of how the DATABASE_URL might look for a MySQL database:

`DATABASE_URL="mysql://myuser:mypassword@localhost:3306/mydatabase"`

### Creating tables and uploading initial data
To create tables run 
```npx prisma db push```

### Starting Development Server

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```To be able to create teams you have to first upload some players. Press Load Gamers button to get them into database. Press Load Stats Data button to get some initial match statistics for your players```


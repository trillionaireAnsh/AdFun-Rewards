# AdFun Rewards

Welcome to AdFun Rewards, a modern and engaging rewards application where users can earn coins by completing a variety of tasks and offers. This project is built using Next.js, Firebase, and Tailwind CSS, creating a fast, scalable, and user-friendly experience.

## Key Features

- **User Authentication**: Secure user sign-up and login system powered by Firebase Authentication.
- **Offer Walls**: Integrated with multiple offer wall providers where users can complete tasks like surveys and app installs to earn significant rewards. The revenue is shared with the user.
- **Mini-Games & Tasks**: A suite of simple and fun ways to earn coins:
    - **Spin & Win**: A prize wheel for a chance to win random coin amounts.
    - **Scratch Cards**: Daily digital scratch cards that reveal coin prizes.
    - **Daily Bonus**: A simple daily check-in to reward user loyalty.
    - **Solve Captcha**: A quick task to earn a small number of coins.
- **Referral System**: A multi-tiered referral program that rewards users with a lifetime commission on their friends' earnings and milestone bonuses for their friends' achievements.
- **Withdrawal System**: Users can cash out their earned coins for real money via various payment methods, with requests tracked in a history table.
- **Persistent Coin Management**: User coin balances are securely stored and managed using Firestore, with real-time updates reflected across the app.
- **Responsive Design**: A clean, modern UI built with ShadCN components and Tailwind CSS that works beautifully across all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Language**: TypeScript

## Getting Started

To get started with the project, take a look at the main dashboard page located at `src/app/page.tsx` and the various feature pages within the `src/app/` directory.

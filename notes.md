there should be ui for create game
and ui for joining game

there should be a screen for the real game
in the game screen, each users should be notified when the other player plays
but result will not be displayed until both users have played


it will be a good ux to display the stake of the game when user wants to join a game to avoid sending incorrect stake


the game can also have history page( this should be optional )


{
  "name": "rockpaperscissors",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@particle-network/auth": "^1.2.0",
    "@particle-network/connectkit": "^2.0.9",
    "@particle-network/provider": "^1.2.0",
    "@rainbow-me/rainbowkit": "^2.2.0",
    "@tanstack/react-query": "^5.55.3",
    "lucide-react": "^0.453.0",
    "next": "^14.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-error-boundary": "^4.1.2",
    "react-hot-toast": "^2.4.1",
    "shadcn-ui": "^0.9.2",
    "viem": "^2.21.43",
    "wagmi": "^2.12.29"
  },
  "devDependencies": {
    "@types/node": "^20.14.8",
    "@types/react": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "5.5.2"
  }
}

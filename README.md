# Entain Project

A full-stack application for searching and browsing films using The Movie Database (TMDB) API.

## Project Structure

```
entain/
├── backend/          # NestJS backend API
└── frontend/         # React + Vite frontend
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **TMDB Access Token** - Get your API token from [TMDB](https://www.themoviedb.org/settings/api)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd entain
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend/` directory:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
PORT=3000
```

Start the development server:

```bash
npm run start:dev
```

The backend will be running on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Available Scripts

### Backend Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run start:prod` - Start production server from compiled files
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

### Backend

Create a `.env` file in the `backend/` directory with the following variables:

- `TMDB_ACCESS_TOKEN` (required) - Your TMDB API access token
- `PORT` (optional) - Server port (default: 3000)

## API Endpoints

The backend provides the following endpoints:

- `GET /films/search?query={query}&page={page}` - Search films by query and page number

## Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for TMDB API

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Styling
- **Lucide React** - Icons

## Development

Both frontend and backend need to be running simultaneously:

1. Start the backend server first (port 3000)
2. Then start the frontend server (port 5173)
3. Open `http://localhost:5173` in your browser

The frontend is configured to communicate with the backend at `http://localhost:3000`.

## Troubleshooting

### Backend Issues

- Ensure the `.env` file exists in the `backend/` directory
- Verify `TMDB_ACCESS_TOKEN` is set correctly
- Check if port 3000 is available (or change `PORT` in `.env`)

### Frontend Issues

- Ensure the backend is running on port 3000
- Check browser console for CORS errors
- Verify API base URL in `src/api/index.ts`

## License

UNLICENSED

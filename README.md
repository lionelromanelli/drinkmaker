# DrinkMaker App

A full-stack application that suggests cocktail recipes based on available ingredients using an external AI bartender service.

## Features

- **Frontend**: Next.js app with shadcn/ui and Tailwind CSS
- **Backend**: Hono framework with Bun runtime
- **AI Integration**: Connects to external bartender service for recipe generation

## Project Structure

```
drinkmaker/
├── backend/           # Hono + Bun backend
│   ├── package.json
│   └── server.js
├── frontend/          # Next.js frontend
│   ├── package.json
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   └── DrinkCard.tsx
│   └── lib/
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies with Bun:
   ```bash
   bun install
   ```

3. Start the server:
   ```bash
   bun run dev
   ```

   The backend will run on `http://localhost:3001`

**Note**: This backend uses Hono framework with Bun runtime. Make sure you have [Bun](https://bun.sh/) installed.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## Configuration

### Backend Configuration

The backend can be configured using environment variables:

- `PORT`: Server port (default: 3003)
- `OLLAMA_HOST`: External Ollama service host (default: http://localhost:11434)

### Frontend Configuration

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:3003/api)

## Usage

1. Start both backend and frontend servers
2. Open the app in your browser at `http://localhost:3000`
3. Enter ingredients in the text input (e.g., "vodka, orange juice, ice")
4. Press Enter to get cocktail recommendations
5. View the results as cards showing drink names, ingredients, and preparation steps

## API Endpoints

### POST /api/drinks

Request body:
```json
{
  "ingredients": "vodka, orange juice, ice"
}
```

Response:
```json
{
  "drinks": [
    {
      "nombre": "Vodka Sunrise",
      "ingredientes": ["vodka", "jugo de naranja", "sake", "hielo"],
      "preparacion": [
        "Llenar vaso alto con hielo",
        "Verter vodka y sake",
        "Completar con jugo de naranja fresco",
        "Mezclar lentamente",
        "Decorar con rodaja de naranja"
      ]
    }
  ]
}
```

## External Dependencies

This app requires an external Ollama service running on `http://localhost:11434` (configurable) that accepts POST requests to `/api/generate` with the following format:

```json
{
  "model": "bartender-json",
  "prompt": "vodka, orange juice, ice",
  "stream": false
}
```

# AI Fitness Planner

A React + TypeScript web app that generates personalised weekly workout plans using an AI language model via the OpenRouter API.

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20.19+ or v22.12+
- An [OpenRouter](https://openrouter.ai/) API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/wizziez/AI-Fitness-Planner.git
cd AI-Fitness-Planner

# 2. Install dependencies
npm install

# 3. Configure your API key
#    Create a .env file in the project root:
echo "VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here" > .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
npm run preview
```

---

## How It Works

1. Fill in your fitness profile (age, weight, height, experience, goals, available days).
2. Click **Generate Plan** — the app sends your profile to the `openai/gpt-oss-120b:free` model via OpenRouter.
3. The AI returns a structured JSON workout plan, which is rendered as a responsive weekly grid.

---

## AI Disclosure

This application uses an AI language model (`openai/gpt-oss-120b:free` via [OpenRouter](https://openrouter.ai/)) to generate workout plans.

- **Generated content is not medical advice.** Always consult a qualified healthcare professional before starting a new training program.
- Plans are generated dynamically and may vary between requests. Results are not guaranteed to be accurate, complete, or suitable for every individual.
- The AI model may occasionally produce unexpected or incorrect output. The app validates the response schema and will surface an error if the response is malformed.

---

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- CSS Modules (no Tailwind, no UI component libraries)
- [OpenRouter API](https://openrouter.ai/) for AI inference

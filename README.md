# AI Fitness Planner

React + TypeScript app that generates personalised weekly workout plans via OpenRouter AI.

> [!TIP]
> **🌐 Live demo:** https://wizziez.github.io/AI-Fitness-Planner/
> **🐳 Docker:** `docker run -e VITE_OPENROUTER_API_KEY=your_key -p 8080:80 ghcr.io/wizziez/ai-fitness-planner:latest`

<table><tr>
<td><img width="260" src="https://github.com/user-attachments/assets/3c70c7d5-415a-4601-aa0f-ae82ca24ea4c" /></td>
<td><img width="260" src="https://github.com/user-attachments/assets/c2d3c1f9-91e5-47f2-b35d-9ba8dc8fb245" /></td>
<td><img width="260" src="https://github.com/user-attachments/assets/69090df9-0f84-473c-ad60-d361df4e15f1" /></td>
</tr></table>

## Assignment Checklist

- Uses a modern web framework (React) – **yes**
- No UI/CSS libraries (Tailwind, Shadcn, MUI, etc.) – **CSS Modules only**
- Custom system prompt and JSON schema handling – **implemented**
- Follows the provided Figma design and hierarchy – **closely matched**
- Handles API failures and malformed JSON without breaking – **yes**
- Responsive and mobile‑friendly – **yes**

## Tech Stack

- React + TypeScript (Vite)
- Vanilla CSS Modules (`*.module.css`) for all styling
- OpenRouter Chat Completions API for AI‑generated plans

## Project Structure

- `src/App.tsx` – top‑level layout, OpenRouter call, view switching
- `src/components/WorkoutForm.tsx` – input form for user details and goals
- `src/components/WorkoutPlan.tsx` – visual weekly plan cards
- `src/components/*.module.css` – Figma‑driven "Elite" theme styles

## OpenRouter Setup

1. Create an OpenRouter account and generate an API key:
   `https://openrouter.ai/settings/keys`
2. Copy `.env.sample` to `.env` and fill in your key:

   ```bash
   cp .env.sample .env
   # then edit .env and set VITE_OPENROUTER_API_KEY=sk-or-...
   ```

3. (Optional) Enable free endpoints in OpenRouter privacy settings if required by your chosen model.

By default, the app uses:

- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: `mistralai/mistral-7b-instruct:free` (overridable via `VITE_MODEL` in `.env`)

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
cp .env.sample .env
# edit .env and set VITE_OPENROUTER_API_KEY=sk-or-...

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
npm run preview
```

### Docker

**Build and run locally:**
```bash
docker build -t ai-fitness-planner .
docker run -e VITE_OPENROUTER_API_KEY=your_key -p 8080:80 ai-fitness-planner
```
Then open `http://localhost:8080`.

**Pull pre-built image (published on each tagged release):**
```bash
docker run -e VITE_OPENROUTER_API_KEY=your_key -p 8080:80 ghcr.io/wizziez/ai-fitness-planner:latest
```

---

## Prompt & JSON Schema

`App.tsx` sends:

- A **system prompt** that instructs the model to return **only JSON** matching the schema:
  - `plan_name`
  - `weekly_summary` (`total_days`, `rest_days`, `focus`)
  - `days[]` (per‑day workout info, intensity, calories, exercises, tip)
  - `nutrition_tip`, `recovery_tip`
- A **user prompt** built from form inputs (age, weight, height, gender, experience, objective, days/week, notes).

The response is parsed and schema-validated before display. Malformed responses surface a friendly error without crashing.

## Error Handling & Safety

- Non‑2xx responses from OpenRouter throw an error surfaced to the user.
- `message.content` is normalised to handle both string and array shapes returned by some models.
- JSON parsing and schema checks are wrapped in `try/catch`.

## UI & Responsiveness

Key UI decisions (driven by the Figma "Elite Performance" design):

- Root background `#0D0D0D`, cards `#141418` with `1px solid #1E1E24`.
- Cyan accent `#00F0FF` for primary actions, chips, and key typography.
- All‑caps headers with extra letter‑spacing.
- Workout plan cards in a responsive grid: 1 col mobile → 2 col tablet → 3 col desktop (≥1024px).
- Custom 6px cyan bullets for exercises.

## How It Works

1. Fill in your fitness profile (age, weight, height, experience, goals, available days).
2. Click **Generate Plan** — the app sends your profile to `mistralai/mistral-7b-instruct:free` via OpenRouter.
3. The AI returns a structured JSON workout plan rendered as a responsive weekly grid.

---

## AI Disclosure

This application uses `mistralai/mistral-7b-instruct:free` via [OpenRouter](https://openrouter.ai/) to generate workout plans.

> [!WARNING]
> AI-generated plans are **not medical advice**. Always consult a qualified healthcare professional before starting a new training program.

This project was developed using a "Human-in-the-Loop" AI workflow.

**Architectural Ownership:** Core logic, state transitions, and data normalisation strategies were designed by me.

**AI as a Force Multiplier:** Tools like Cursor and v0.dev were used to implement components, refine CSS Modules to match Figma tokens, and ensure cross-device responsiveness.


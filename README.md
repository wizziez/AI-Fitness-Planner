# AI Fitness Planner

Take‑home assignment implementation for the **AI Fitness Planner** web app.

The app lets a user enter basic profile and training preferences, sends a structured prompt to an OpenRouter model, and renders the returned JSON as an **Elite Performance Weekly** plan using responsive cards and UI elements.

UI Preview:

<img width="615" height="865" alt="Screenshot 2026-03-08 211957" src="https://github.com/user-attachments/assets/3c70c7d5-415a-4601-aa0f-ae82ca24ea4c" />
<img width="617" height="412" alt="Screenshot 2026-03-08 212001" src="https://github.com/user-attachments/assets/c2d3c1f9-91e5-47f2-b35d-9ba8dc8fb245" />
<img width="918" height="883" alt="Screenshot 2026-03-08 210558" src="https://github.com/user-attachments/assets/69090df9-0f84-473c-ad60-d361df4e15f1" />

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

By default, the app is configured to use:

- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: `"openai/gpt-oss-120b:free"`

You can change the `model` field in `src/App.tsx` to target a different free model if desired.

## Prompt & JSON Schema

`App.tsx` sends:

- A **system prompt** that instructs the model to return **only JSON** matching the assignment schema:
  - `plan_name`
  - `weekly_summary` (`total_days`, `rest_days`, `focus`)
  - `days[]` (per‑day workout info, intensity, calories, exercises, tip)
  - `nutrition_tip`, `recovery_tip`
- A **user prompt** built from form inputs (age, weight, height, gender, experience, objective, days/week, notes).

The response is parsed and validated before being displayed. If the content is missing, not a string, or doesn't match the expected structure, the app surfaces a friendly error and does not crash.

## Running the App Locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (typically `http://localhost:5173`).

## Error Handling & Safety

- Non‑2xx responses from OpenRouter throw an error with the HTTP status code, which is surfaced to the user.
- The code normalizes `message.content` to handle both string and array shapes returned by some models.
- JSON parsing and basic schema checks are wrapped in `try/catch` so malformed responses do not break the UI.

## UI & Responsiveness

Key UI decisions (driven by the Figma "Elite Performance" design):

- Root background `#0D0D0D`, cards `#141418` with `1px solid #1E1E24`.
- Cyan accent `#00F0FF` for primary actions, chips, and key typography.
- All‑caps headers with extra letter‑spacing (e.g. "ELITE PERFORMANCE WEEKLY").
- Segmented controls and day buttons with dark selected state + cyan border/glow (no solid cyan fills).
- Workout plan cards laid out in a responsive grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop (≥1024px): 3 columns with 24px gap
- Custom 6px cyan bullets for exercises (no default list styles).

The layout is fully responsive and usable on mobile, tablet, and desktop.

## AI Disclosure
This application uses an AI language model (`openai/gpt-oss-120b:free` via [OpenRouter](https://openrouter.ai/)) to generate workout plans.

Following the assignment requirements, this project was developed using a "Human-in-the-Loop" AI workflow.

Architectural Ownership: The core application logic, state management transitions, and data normalization strategies (such as the `normalisedCalories` helper) were designed by me.

AI as a Force Multiplier: Tools like Cursor (Composer) and v0.dev were utilized to implement components, refine CSS Modules to match Figma tokens exactly, and ensure cross-device responsiveness.


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




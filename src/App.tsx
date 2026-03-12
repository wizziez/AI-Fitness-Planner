 import React, { useState } from 'react'
import styles from './App.module.css'
import Logo from './components/Logo'
import WorkoutForm, {
  type WorkoutFormValues,
} from './components/WorkoutForm'
import WorkoutPlan, {
  type FitnessPlan,
} from './components/WorkoutPlan'
 
 type View = 'form' | 'plan'
 
 const buildPromptFromForm = (values: WorkoutFormValues): string => {
  const experienceLabel =
    values.experience.charAt(0).toUpperCase() +
    values.experience.slice(1)
 
  return [
    `Create a weekly workout plan for a client with the following profile:`,
    `Age: ${values.age}`,
    `Weight: ${values.weightKg} kg`,
    `Height: ${values.heightCm} cm`,
    `Gender: ${values.gender}`,
    `Training experience: ${experienceLabel}`,
    `Primary objective: ${values.objective}`,
    `Days per week available: ${values.daysPerWeek}`,
    values.notes
      ? `Additional notes / constraints: ${values.notes}`
      : 'No additional constraints were provided.',
    '',
    `Return ONLY a JSON object (no markdown, no explanation) that strictly matches the schema given in the system prompt.`,
  ].join('\n')
 }
 
 const App: React.FC = () => {
  const [view, setView] = useState<View>('form')
  const [plan, setPlan] = useState<FitnessPlan | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleGeneratePlan = async (values: WorkoutFormValues) => {
    setIsLoading(true)
    setError(null)

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

    if (!apiKey) {
      setError('API key is not configured. Set VITE_OPENROUTER_API_KEY in your .env file (local) or as a GitHub Actions secret (deployed).')
      setIsLoading(false)
      return
    }

    // Fallback chain: if one model is unavailable (404), try the next
    // Updated with currently active free models from OpenRouter API
    const modelChain = import.meta.env.VITE_MODEL
      ? [import.meta.env.VITE_MODEL]
      : [
          'openrouter/free', // Generic robust fallback
          'meta-llama/llama-3.3-70b-instruct:free',
          'google/gemma-3-27b-it:free',
          'mistralai/mistral-small-3.1-24b-instruct:free',
        ]

    const httpReferer = import.meta.env.VITE_HTTP_REFERER || 'https://ai-fitness-planner.local'
    const appTitle = import.meta.env.VITE_APP_TITLE || 'AI Fitness Planner'
    const systemPrompt = import.meta.env.VITE_SYSTEM_PROMPT ||
      'You are an elite AI fitness coach. You must respond with ONLY a valid JSON object, no code fences, no comments, no additional text. The JSON must match this exact schema: { "plan_name": string, "weekly_summary": { "total_days": number, "rest_days": number, "focus": string }, "days": [ { "day": string, "type": string, "title": string, "duration_min": number, "intensity": "Low"|"Medium"|"High"|"Max", "calories_est": number, "exercises": [ { "name": string, "sets": number, "reps": string } ], "tip": string } ], "nutrition_tip": string, "recovery_tip": string }. Only return values that conform to this schema.'

    let lastError: Error | null = null

    for (const model of modelChain) {
      try {
        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
              'HTTP-Referer': httpReferer,
              'X-Title': appTitle,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: buildPromptFromForm(values) },
              ],
              temperature: 0.8,
            }),
          }
        )

        if (!response.ok) {
          const errBody = await response.json().catch(() => null)
          const errMsg = errBody?.error?.message ?? errBody?.message ?? response.statusText

          // If model is not found (404), try next model in chain
          if (response.status === 404 && modelChain.length > 1) {
            console.warn(`Model ${model} not available, trying next...`)
            lastError = new Error(`${model}: ${errMsg}`)
            continue
          }

          if (response.status === 429) {
            throw new Error('Rate limit reached. Please wait 30 seconds and try again.')
          }
          throw new Error(`Request failed (${response.status}): ${errMsg}`)
        }

        const json = await response.json()
        const message = json?.choices?.[0]?.message
        let content = message?.content as unknown

        if (Array.isArray(content)) {
          content = content
            .map((part) =>
              typeof part === 'string'
                ? part
                : typeof part?.text === 'string'
                  ? part.text
                  : ''
            )
            .join('')
        }

        if (!content || typeof content !== 'string') {
          console.error('Unexpected AI response shape:', json)
          throw new Error('The AI response was empty or invalid.')
        }

        const parsed: FitnessPlan = JSON.parse(content)

        if (
          !parsed ||
          typeof parsed.plan_name !== 'string' ||
          !parsed.weekly_summary ||
          !Array.isArray(parsed.days)
        ) {
          throw new Error('The AI response did not match the expected schema.')
        }

        setPlan(parsed)
        setView('plan')
        return // Success, exit function
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err))
        // If this is the last model, don't continue
        if (model === modelChain[modelChain.length - 1]) {
          break
        }
      }
    }

    // All models failed
    console.error('Error generating plan:', lastError)
    const message = lastError?.message ?? 'Unknown error occurred.'
    setError(
      `We had trouble generating your plan. All available models are offline or rate-limited. (${message})`
    )
    setIsLoading(false)
  }
 
  const handleReset = () => {
    setView('form')
    setPlan(null)
  }
 
  return (
    <div className={styles.appRoot}>
      {isLoading && (
        <div className={styles.loadingOverlay} aria-hidden="true">
          <div className={styles.loadingInner}>
            <div className={styles.loadingPulse} />
            <div className={styles.loadingLabel}>Generating your plan</div>
          </div>
        </div>
      )}

      <main className={styles.shell}>
        <header className={styles.headerBar}>
          <Logo />
          <div className={styles.tagline}>
            Elite performance weekly, built in seconds.
          </div>
        </header>

        <section className={styles.content}>
          {view === 'plan' && (
            <div className={styles.viewToggle}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleReset}
                disabled={isLoading}
              >
                ← Edit inputs
              </button>
            </div>
          )}

          {view === 'form' ? (
            <WorkoutForm
              onGenerate={handleGeneratePlan}
              isLoading={isLoading}
              errorMessage={error}
            />
          ) : (
            <WorkoutPlan plan={plan} />
          )}
        </section>
      </main>
    </div>
  )
 }
 
 export default App


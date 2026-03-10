 import React, { useState } from 'react'
 import styles from './WorkoutForm.module.css'
 
 export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
 export type Objective =
  | 'lose_fat'
  | 'build_muscle'
  | 'endurance'
  | 'mobility'
  | 'general_fitness'
  | 'strength'
 
 export interface WorkoutFormValues {
  age: number
  weightKg: number
  heightCm: number
  gender: 'male' | 'female' | 'other'
  experience: ExperienceLevel
  objective: Objective
  daysPerWeek: number
  notes: string
 }
 
 interface WorkoutFormProps {
  onGenerate: (values: WorkoutFormValues) => void
  isLoading: boolean
  errorMessage?: string | null
 }
 
 const DAYS_OPTIONS = [3, 4, 5, 6, 7]
 
 export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onGenerate,
  isLoading,
  errorMessage,
 }) => {
  const [age, setAge] = useState<string>('28')
  const [weightKg, setWeightKg] = useState<string>('72')
  const [heightCm, setHeightCm] = useState<string>('180')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female')
  const [experience, setExperience] = useState<ExperienceLevel>('advanced')
  const [objective, setObjective] = useState<Objective>('general_fitness')
  const [daysPerWeek, setDaysPerWeek] = useState<number>(7)
  const [notes, setNotes] = useState<string>(
    'I have a bad knee, only have dumbbells, prefer home workouts, training for a ski trip in 8 weeks.'
  )
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
 
    const numericAge = Number(age)
    const numericWeight = Number(weightKg)
    const numericHeight = Number(heightCm)
 
    if (!numericAge || !numericWeight || !numericHeight) {
      return
    }
 
    const payload: WorkoutFormValues = {
      age: numericAge,
      weightKg: numericWeight,
      heightCm: numericHeight,
      gender,
      experience,
      objective,
      daysPerWeek,
      notes: notes.trim(),
    }
 
    onGenerate(payload)
  }
 
  const renderExperienceLabel = (level: ExperienceLevel) => {
    switch (level) {
      case 'beginner':
        return '0–6 months'
      case 'intermediate':
        return '6–24 months'
      case 'advanced':
        return '2+ years'
      default:
        return ''
    }
  }
 
  const renderObjectiveLabel = (obj: Objective) => {
    switch (obj) {
      case 'lose_fat':
        return 'Lose Fat'
      case 'build_muscle':
        return 'Build Muscle'
      case 'endurance':
        return 'Endurance'
      case 'mobility':
        return 'Mobility'
      case 'general_fitness':
        return 'General'
      case 'strength':
        return 'Strength'
      default:
        return ''
    }
  }
 
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.heroIconRow}>
        <div className={styles.heroIcon}>⚡</div>
      </div>
 
      <div className={styles.titleBlock}>
        <div className={styles.title}>Elite Performance Weekly</div>
        <div className={styles.headline}>
          Build your <span>plan</span>
        </div>
        <p className={styles.subtitle}>
          Share a few details and we&apos;ll build your perfect weekly fitness
          routine.
        </p>
      </div>
 
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Body stats</div>
          <div className={styles.sectionTitle}>Dial in the basics</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <div className={styles.fieldLabelRow}>
              <label className={styles.fieldLabel} htmlFor="age">
                Age
              </label>
              <span className={styles.fieldMeta}>years</span>
            </div>
            <input
              id="age"
              className={styles.input}
              type="number"
              min={14}
              max={90}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="28"
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabelRow}>
              <label className={styles.fieldLabel} htmlFor="weight">
                Weight
              </label>
              <span className={styles.fieldMeta}>kg</span>
            </div>
            <input
              id="weight"
              className={styles.input}
              type="number"
              min={35}
              max={220}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              placeholder="72"
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabelRow}>
              <label className={styles.fieldLabel} htmlFor="height">
                Height
              </label>
              <span className={styles.fieldMeta}>cm</span>
            </div>
            <input
              id="height"
              className={styles.input}
              type="number"
              min={130}
              max={220}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="180"
            />
          </div>
        </div>
        <div className={styles.field} style={{ marginTop: '12px' }}>
          <div className={styles.fieldLabelRow}>
            <span className={styles.fieldLabel}>Gender</span>
          </div>
          <div className={styles.segmentedRow}>
            <button
              type="button"
              className={`${styles.segmentButton} ${
                gender === 'male' ? styles.segmentButtonActive : ''
              }`}
              onClick={() => setGender('male')}
            >
              Male
            </button>
            <button
              type="button"
              className={`${styles.segmentButton} ${
                gender === 'female' ? styles.segmentButtonActive : ''
              }`}
              onClick={() => setGender('female')}
            >
              Female
            </button>
            <button
              type="button"
              className={`${styles.segmentButton} ${
                gender === 'other' ? styles.segmentButtonActive : ''
              }`}
              onClick={() => setGender('other')}
            >
              Other
            </button>
          </div>
        </div>
      </section>
 
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Experience tier</div>
          <div className={styles.sectionTitle}>
            We&apos;ll match your current level
          </div>
        </div>
        <div className={`${styles.grid} ${styles.gridTwo ?? ''}`}>
          {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(
            (level) => (
              <div key={level} className={styles.pill}>
                <button
                  type="button"
                  className={`${styles.segmentButton} ${
                    experience === level ? styles.segmentButtonActive : ''
                  }`}
                  onClick={() => setExperience(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span>{renderExperienceLabel(level)}</span>
                </button>
              </div>
            )
          )}
        </div>
      </section>
 
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Primary objective</div>
          <div className={styles.sectionTitle}>
            What are we training for?
          </div>
        </div>
        <div className={`${styles.grid} ${styles.gridTwo ?? ''}`}>
          {([
            'lose_fat',
            'build_muscle',
            'endurance',
            'mobility',
            'general_fitness',
            'strength',
          ] as Objective[]).map((obj) => (
            <div key={obj} className={styles.pill}>
              <button
                type="button"
                className={`${styles.segmentButton} ${
                  objective === obj ? styles.segmentButtonActive : ''
                }`}
                onClick={() => setObjective(obj)}
              >
                {renderObjectiveLabel(obj)}
              </button>
            </div>
          ))}
        </div>
      </section>
 
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabelRow}>
            <div className={styles.sectionLabel}>Weekly load</div>
            <div className={styles.sectionCount}>
              {String(daysPerWeek).padStart(2, '0')} days
            </div>
          </div>
          <div className={styles.sectionTitle}>
            How many days can you commit?
          </div>
        </div>
        <div className={styles.daysRow}>
          {DAYS_OPTIONS.map((day) => (
            <button
              key={day}
              type="button"
              className={`${styles.dayButton} ${
                daysPerWeek === day ? styles.dayButtonActive : ''
              }`}
              onClick={() => setDaysPerWeek(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </section>
 
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Anything else?</div>
          <div className={styles.sectionTitle}>
            Injuries, equipment, schedule quirks
          </div>
        </div>
        <div className={styles.field}>
          <textarea
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share any injuries, equipment limits, or preferences so we can personalise your plan."
          />
        </div>
      </section>
 
      <div className={styles.footerRow}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Generating your plan…' : 'Generate my plan'}
          <span>↗</span>
        </button>
        <p className={styles.helper}>
          Your plan is generated on the fly using an AI coach. It takes a few
          seconds and never stores your personal data.
        </p>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    </form>
  )
 }
 
 export default WorkoutForm


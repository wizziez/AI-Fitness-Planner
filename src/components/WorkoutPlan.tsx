 import React from 'react'
 import styles from './WorkoutPlan.module.css'
 
 export type Intensity = 'Low' | 'Medium' | 'High' | 'Max'
 
 export interface Exercise {
  name: string
  sets: number
  reps: string
 }
 
 export interface DayPlan {
  day: string
  type: string
  title: string
  duration_min: number
  intensity: Intensity
  calories_est: number
  exercises: Exercise[]
  tip: string
 }
 
 export interface WeeklySummary {
  total_days: number
  rest_days: number
  focus: string
 }
 
 export interface FitnessPlan {
  plan_name: string
  weekly_summary: WeeklySummary
  days: DayPlan[]
  nutrition_tip: string
  recovery_tip: string
 }
 
 interface WorkoutPlanProps {
  plan: FitnessPlan | null
 }
 
const intensityClassName = (intensity: Intensity) => {
  switch (intensity) {
    case 'Low':
      return styles.chipIntensityLow
    case 'Medium':
      return styles.chipIntensityMedium
    case 'High':
      return styles.chipIntensityHigh
    case 'Max':
      return styles.chipIntensityMax
    default:
      return ''
  }
 }

const normalisedCalories = (calories: number): number =>
  calories && calories > 0 ? calories : 300
 
 export const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ plan }) => {
  if (!plan) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyState}>
          Once your AI coach generates a plan it will appear here.
        </div>
      </div>
    )
  }
 
  const { weekly_summary: summary } = plan
 
  return (
    <div className={styles.wrapper}>
      <section className={styles.summaryCard}>
        <div className={styles.summaryHeader}>
          <div className={styles.summaryLabel}>Weekly blueprint</div>
          <div className={styles.summaryTitle}>{plan.plan_name}</div>
          <p className={styles.summarySubtitle}>{summary.focus}</p>
        </div>
        <div className={styles.summaryStats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Active days</div>
            <div className={styles.statValue}>{summary.total_days}</div>
            <div className={styles.statBadge}>sessions / week</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Rest cycle</div>
            <div className={styles.statValue}>{summary.rest_days}</div>
            <div className={styles.statBadge}>rest days</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Est. kcal / week</div>
            <div className={styles.statValue}>
              {plan.days.reduce(
                (total, day) => total + normalisedCalories(day.calories_est),
                0
              )}
            </div>
            <div className={styles.statBadge}>approximate output</div>
          </div>
        </div>
        <div className={styles.tipsRow}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🍽</div>
            <div>
              <div className={styles.tipMeta}>Nutrition</div>
              <div>{plan.nutrition_tip}</div>
            </div>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>☽</div>
            <div>
              <div className={styles.tipMeta}>Recovery</div>
              <div>{plan.recovery_tip}</div>
            </div>
          </div>
        </div>
      </section>
 
      <section className={styles.daysGrid}>
        {plan.days.map((day) => (
          <article key={day.day} className={styles.dayCard}>
            <header className={styles.dayHeader}>
              <div className={styles.dayTitleBlock}>
                <div className={styles.dayLabel}>Day plan</div>
                <div className={styles.dayTitle}>{day.title}</div>
                <div className={styles.subtitle}>{day.type}</div>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.cardIcon}>⚡</div>
                <div className={styles.dayPill}>{day.day}</div>
              </div>
            </header>
 
            <div className={styles.metricsPillRow}>
              <div className={styles.metricPill}>
                <div className={styles.metricIcon}>⏱</div>
                <span>{day.duration_min} min</span>
              </div>
              <div className={styles.metricPill}>
                <div className={styles.metricIcon}>🔥</div>
                <span>{normalisedCalories(day.calories_est)} kcal</span>
              </div>
              <div className={styles.metricPill}>
                <div className={styles.metricIcon}>🎯</div>
                <span>{day.type}</span>
              </div>
            </div>

            <div className={styles.chipRow}>
              <span
                className={`${styles.chip} ${intensityClassName(
                  day.intensity
                )}`}
              >
                {day.intensity} intensity
              </span>
            </div>
 
            {day.exercises && day.exercises.length > 0 && (
              <ul className={styles.exerciseList}>
                {day.exercises.map((exercise) => (
                  <li
                    key={exercise.name}
                    className={styles.exerciseItem}
                  >
                    <div>
                      {exercise.name}
                      <div className={styles.exerciseMeta}>
                        {exercise.sets} sets · {exercise.reps}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
 
            {day.tip && (
              <p className={styles.tipText}>
                <strong>Coach note:</strong> {day.tip}
              </p>
            )}
          </article>
        ))}
      </section>
 
      <p className={styles.footerNote}>
        This plan is informational only and not a substitute for medical
        advice. Always clear new training blocks with your doctor.
      </p>
    </div>
  )
 }
 
 export default WorkoutPlan


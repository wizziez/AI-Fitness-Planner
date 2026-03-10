import React from 'react'
import styles from './Logo.module.css'

const Logo: React.FC = () => {
  return (
    <div className={styles.logoRoot} aria-label="AI Fitness Planner">
      <div className={styles.mark}>
        <svg
          className={styles.icon}
          viewBox="0 0 32 20"
          aria-hidden="true"
        >
          <path
            d="M3 10.5L9.5 3h5L10 10.5l4.5 7.5h-5L3 10.5Z"
            fill="#02070b"
          />
          <path
            d="M15 4.5h5.2c3.4 0 6.1 2.7 6.1 6.1S23.6 16.7 20.2 16.7H15"
            stroke="#0ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="10.6" r="1.4" fill="#0ff" />
        </svg>
      </div>
      <div className={styles.wordmark}>
        AI FITNESS <span>PLANNER</span>
      </div>
    </div>
  )
}

export default Logo


import React from 'react'
import styles from './Button.module.scss'

const Button = ({ label, type, className, ...props }) => {
    return (
        <button type={type} className={`${styles.btn} ${className}`} {...props}>
            {label}
        </button>
    )
}

export default Button
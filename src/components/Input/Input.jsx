import React from 'react'
import styles from './Input.module.scss'

const Input = ({ label, type, id, value, className, ...props }) => {

    return (
        <div className={`${styles.inputField} ${className}`}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input id={id} value={value} type={type} {...props} className={styles.input} />
        </div>
    )
}

export default Input
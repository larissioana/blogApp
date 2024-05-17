"use client";
import { useContext } from 'react';
import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggle } = useContext(ThemeContext);

    return (
        <div className={styles.container}
            onClick={toggle}
            style={
                theme === "dark" ? { backgroundColor: "#212020" } : { backgroundColor: "#0f172a" }
            }
        >

            <Image src="/moon.png" alt="toggle moon" width={20} height={20} />

            <div
                className={styles.ball}
                style={
                    theme === "dark"
                        ? { left: 1, background: "#dcdcdd" }
                        : { right: 1, background: "#ecebeb" }
                }
            >
            </div>
            <Image src="/sun.png" alt="toggle sun" width={20} height={20} />
        </div >
    )
}

export default ThemeToggle

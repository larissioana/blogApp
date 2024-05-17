"use client";
import Link from "next/link";
import styles from './authLinks.module.css';
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const AuthLinks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { status } = useSession();

    return (
        <>
            {
                status === "unauthenticated" ?
                    <Link href="/login" className={styles.link}>Login</Link>
                    :
                    <>
                        <Link href="/write" className={styles.link}>Write</Link>
                        <span className={styles.link} onClick={() => signOut()}>Logout</span>
                    </>
            }
            <div className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            {
                isOpen && (
                    <div className={styles.responsiveMenu}>
                        <Link href="/">Homepage</Link>
                        <Link href="/">Contact</Link>
                        <Link href="/">About</Link>
                        {
                            status === "unauthenticated" ?
                                <Link href="/login">Login</Link>
                                :
                                <>
                                    <Link href="/write">Write</Link>
                                    <span className={styles.link}>Logout</span>
                                </>
                        }
                    </div>
                )
            }
        </>
    )
};

export default AuthLinks;

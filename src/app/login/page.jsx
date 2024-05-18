"use client";
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage = () => {
    const { data, status } = useSession();
    const router = useRouter();

    const handleLoginWithGoogle = () => {
        signIn("google");
    };

    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>
    }

    if (status === "authenticated") {
        return router.push('/')
    }

    return (
        <div className={styles.container}>
            <h1>Login to newBlog</h1>
            <div className={styles.wrapper}>
                <Image src="/google.png" width={30} height={30} />
                <div className={styles.socialButton} onClick={handleLoginWithGoogle}>Sign with Google</div>
            </div> *
        </div>
    )
}

export default LoginPage

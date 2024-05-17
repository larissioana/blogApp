"use client";
import Link from 'next/link';
import styles from './comments.module.css';
import Image from 'next/image';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { formatDate } from '@/utils/date';
import Spinner from '../spinner/Spinner';
import { useState } from 'react';

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message);
        throw error;
    }

    return data;
};

const Comments = ({ postSlug }) => {
    const [desc, setDesc] = useState("");

    const { status } = useSession();
    const { data, mutate, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetchData);

    const handleChange = (e) => {
        setDesc(e.target.value);
    };

    const handleSubmit = async () => {
        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, postSlug }),
        });
        mutate();
        setDesc("");
    };

    return (
        <>
            {
                !isLoading ?
                    <div className={styles.container}>
                        <h1>Comments</h1>
                        {
                            status === "authenticated" ?
                                <div className={styles.write}>
                                    <textarea
                                        placeholder='Write a comment...'
                                        className={styles.input}
                                        onChange={handleChange}
                                        value={desc}
                                    />
                                    <button className={styles.button} onClick={handleSubmit}>Send</button>
                                </div>
                                :
                                !isLoading && <div className={styles.linkContainer}>
                                    <Link href="/login" className={styles.link}>Login to write a comment</Link>
                                </div>
                        }
                        <div className={styles.comments}>
                            {
                                data?.map((comment) => {
                                    return <div className={styles.comment} key={comment.id}>
                                        <div className={styles.user}>
                                            {
                                                comment.user.image &&
                                                <Image src={comment.user.image} width={50} height={50} className={styles.image} alt={comment.user.name} />
                                            }
                                            <div className={styles.userInfo}>
                                                <span className={styles.username}>{comment.user.name}</span>
                                                <span className={styles.date}>{formatDate(comment.createdAt)}</span>
                                            </div>
                                        </div>
                                        <p className={styles.desc}>{comment.desc}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className={styles.spinner}>
                        <Spinner />
                    </div>
            }
        </>
    )
};

export default Comments;

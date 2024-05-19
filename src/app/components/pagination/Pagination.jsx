"use client";
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';
import { useEffect } from 'react';

const Pagination = ({ page, hasPrev, hasNext }) => {
    const router = useRouter();

    const handleClickNext = () => {
        router.push(`?page=${page + 1}`);
    };

    const handleClickPrevious = () => {
        router.push(`?page=${page - 1}`);
    };

    useEffect(() => {
        // Prefetch the next and previous pages
        if (hasNext) {
            router.prefetch(`?page=${page + 1}`);
        }
        if (hasPrev) {
            router.prefetch(`?page=${page - 1}`);
        }
    }, [page, hasNext, hasPrev]);

    return (
        <div className={styles.container}>
            <button
                onClick={handleClickPrevious}
                disabled={!hasPrev}
                className={styles.button}
            >
                Previous
            </button>
            <button
                onClick={handleClickNext}
                disabled={!hasNext}
                className={styles.button}
            >
                Next
            </button>

        </div>
    )
};

export default Pagination;

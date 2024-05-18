"use client";
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';
import Link from 'next/link';

const Pagination = ({ page, hasPrev, hasNext }) => {
    const router = useRouter();

    const handleClickNext = () => {
        router.push(`?page=${page + 1}`);
    };

    const handleClickPrevious = () => {
        router.push(`?page=${page - 1}`);
    };


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

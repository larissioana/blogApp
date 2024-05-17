"use client";
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';

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
                disabled={!hasPrev}
                className={styles.button}
                onClick={handleClickPrevious}
            >
                Previous
            </button>
            <button
                disabled={!hasNext}
                className={styles.button}
                onClick={handleClickNext}
            >
                Next
            </button>
        </div>
    )
};

export default Pagination;

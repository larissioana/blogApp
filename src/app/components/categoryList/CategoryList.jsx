import Link from 'next/link';
import styles from './categoryList.module.css';
import Image from 'next/image';

const getCategories = async () => {
    const response = await fetch("https://blog-app-nine-sand.vercel.app/api/categories");
    if (!response.ok) {
        throw new Error("Failed fetching categories")
    }
    return response.json();
};

const CategoryList = async () => {
    const data = await getCategories();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Category</h1>
            <div className={styles.categories}>
                {
                    data?.map((category) => {
                        return <Link key={category.id} prefetch={true} href={`/blog?cat=${category.slug}`} className={`${styles.category} ${styles[category.slug]}`}>
                            {
                                category.img &&
                                <Image
                                    src={category.img}
                                    alt={category.title}
                                    className={styles.image}
                                    width={40}
                                    height={30}
                                />
                            }
                            {category.title}
                        </Link>
                    })
                }
            </div>
        </div>
    )
};

export default CategoryList;

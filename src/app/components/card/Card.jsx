import Link from 'next/link';
import styles from './card.module.css';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import { getBase64 } from '@/utils/get-Base64';

const Card = async ({ posts }) => {
    const imageUrl = await getBase64(posts.img);
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {
                    posts.img &&
                    <Image src={posts.img} fill alt={posts.title} blurDataURL={imageUrl} priority className={styles.img} />
                }
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>{formatDate(posts.createdAt)} -</span>
                    <span className={`${styles.category} ${styles[posts.catSlug]}`}>{posts.catSlug}</span>
                </div>
                <h1 className={styles.postTitle}>{posts.title}</h1>
                <div className={styles.postDesc} dangerouslySetInnerHTML={{ __html: posts.desc.length > 100 ? `${posts.desc.slice(0, 100)}...` : posts.desc }} />
                <Link rel="preload" href={`/post/${posts.slug}`} className={styles.link}>Read more</Link>
            </div>
        </div >
    )
};

export default Card;

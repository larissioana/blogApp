import Link from 'next/link';
import styles from './featured.module.css';
import Image from 'next/image';
import { getBase64 } from '@/utils/get-Base64';

const getPost = async () => {
    const response = await fetch(`https://blog-app-nine-sand.vercel.app/api/posts/6`, {

        next: { revalidate: 3600 }
    });
    if (!response.ok) {
        console.log("Failed fetching categories")
    }
    return response.json()
};

const Featured = async () => {
    const post = await getPost();
    const imageUrl = await getBase64(post.img);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Hey, Larisa here! </b>
                Discover my stories and creative ideas.
            </h1>
            <div className={styles.post} key={post.id}>
                {
                    post.img &&
                    <div className={styles.imgContainer}>
                        <Image src={post.img} priority className={styles.postImg} blurDataURL={imageUrl} alt={post.title} fill />
                    </div>
                }
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    {
                        post.desc &&

                        <p className={styles.postDesc} dangerouslySetInnerHTML={{ __html: post.desc.length > 100 ? `${post.desc.slice(0, 100)}...` : post.desc }} />
                    }
                    <Link href={'/post/6'} prefetch={true} className={styles.btn}>Read more</Link>
                </div>
            </div>
        </div>
    )
};

export default Featured;

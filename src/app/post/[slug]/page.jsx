import Image from 'next/image';
import styles from './page.module.css';
import Menu from '../../components/menu/Menu';
import Comments from '../../components/comments/Comments';
import { formatDate } from '@/utils/date';

const getPost = async (slug) => {
    const response = await fetch(`https://blogapp-zyp2.onrender.com/api/posts/${slug}`);
    if (!response.ok) {
        throw new Error("Failed fetching categories")
    }
    return response.json()
};

const SinglePage = async ({ params }) => {
    const { slug } = params;
    const post = await getPost(slug);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    {
                        post.title &&
                        <h1>{post.title}</h1>
                    }
                    <div className={styles.user}>
                        <div className={styles.userImageContainer}>
                            {
                                post.user.image &&
                                <Image src={post.user.image} alt="" fill loading="eager" className={styles.image} />
                            }
                        </div>
                        {
                            post.user.image &&
                            <div className={styles.userTextContainer}>
                                <span className={styles.username}>{post.user.name}</span>
                                <span className={styles.date}>{formatDate(post.createdAt)}</span>
                                <div className={styles.flexContainer}>
                                    <div className={styles.views}>
                                        <Image src="/eyes.png" width={30} height={30} alt="views" />
                                    </div>
                                    <span>{post.views}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    {
                        post.img &&
                        <Image src={post.img} alt="" fill loading='eager' className={styles.image} />
                    }
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.post}>
                    {
                        post.desc &&
                        <div className={styles.description}>
                            <div className={styles.postDesc} dangerouslySetInnerHTML={{ __html: post.desc }} />
                        </div>
                    }
                    {
                        post.img2 &&
                        <Image src={post.img2} className={styles.img2} alt={post.title} loading='eager' width={300} height={200} />
                    }
                    <div className={styles.comment}>
                        <Comments postSlug={slug} />
                    </div>
                </div>
                <Menu slug={slug} />
            </div>
        </div>
    )
};

export default SinglePage;

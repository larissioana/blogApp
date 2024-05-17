
import Link from "next/link";
import Image from "next/image";
import styles from './menuPosts.module.css';
import { formatDate } from "@/utils/date";

/* const getPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/`, {
        cache: "no-cache"
    });
    if (!response.ok) {
        throw new Error("Failed fetching categories")
    }
    return response.json()
}; */

const MenuPosts = async () => {
    //const posts = await getPosts();

    return (
        <div className={styles.items}>
            {/*   {
                posts?.posts.filter((post) => post.views > 5)
                    .map((post) => {
                        return <Link href={`/post/${post.slug}`} className={styles.item} key={post.id}>
                            {
                                post.user.image &&
                                <div className={styles.imageContainer}>
                                    <Image src={post.user.image} alt={post.user.name} fill className={styles.image} />
                                </div>
                            }
                            <div className={styles.textContainer}>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <div className={styles.detail}>
                                    <span className={styles.username}>{post.user.name}</span>
                                    <span className={styles.date}> - {formatDate(post.createdAt)}</span>
                                </div>
                            </div>
                        </Link>
                    }).slice(0, 5)
            } */}
        </div>
    )
};

export default MenuPosts;

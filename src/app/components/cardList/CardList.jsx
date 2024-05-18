import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import styles from './cardList.module.css';

const getPosts = async (page, cat) => {
    const response = await fetch(`https://blog-app-nine-sand.vercel.app/api/posts?page=${page}&cat=${cat || ""}`);

    if (!response.ok) {
        console.log("Failed fetching categories")
    }
    return response.json()
};

const CardList = async ({ page, cat }) => {
    const { posts, count } = await getPosts(page, cat);
    const POST_PER_PAGE = 5;

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                {
                    posts?.map((post) => {
                        return <Card key={post.id} posts={post} />
                    })
                }
            </div>
            {
                !cat &&
                <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
            }
        </div>
    )
};

export default CardList;

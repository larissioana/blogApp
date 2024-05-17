import CardList from '../components/cardList/CardList';
import Menu from '../components/menu/Menu';
import styles from './page.module.css';

const BlogPage = ({ searchParams }) => {
    const { cat } = searchParams;

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${styles[cat]}`}>{cat} Blog</h1>
            <div className={styles.content}>
                <CardList cat={cat} />
                <Menu />
            </div>
        </div>
    )
}

export default BlogPage

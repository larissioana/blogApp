
import styles from './menu.module.css';
import MenuPosts from '../menuPosts/MenuPosts';
import CategoryList from '../categoryList/CategoryList';

const Menu = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>What's new</h2>
            <h1 className={styles.title}>Most Popular</h1>
            <MenuPosts />
            <CategoryList />
        </div>
    )
};

export default Menu;

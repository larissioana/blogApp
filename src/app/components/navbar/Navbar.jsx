import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";

const Navbar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src="/facebook.png" alt="facebook" width={24} height={24} />
                <Image src="/instagram.png" alt="instagram" width={24} height={24} />
                <Image src="/youtube.png" alt="youtube" width={24} height={24} />
            </div>
            <Link href={"/"} prefetch={true} className={styles.logo}>newBlog</Link>
            <div className={styles.links}>
                <ThemeToggle />
                <Link className={styles.link} href="/" prefetch={true}>Homepage</Link>
                <AuthLinks />
            </div>
        </div>
    )
};

export default Navbar;

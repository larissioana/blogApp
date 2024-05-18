"use client";
import Image from 'next/image';
import styles from './write.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const ReactQuill = dynamic(() => import("react-quill"));
import 'react-quill/dist/quill.bubble.css';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

const storage = getStorage(app);

const WritePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");

    const router = useRouter();

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL);
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch("https://blog-app-nine-sand.vercel.app/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: catSlug || "culture",
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push('/');
        }
    };
    return (
        <div className={styles.container}>
            <input
                type="text"
                onChange={handleChangeTitle}
                placeholder="Title"
                className={styles.input}
            />
            <select
                className={styles.select}
                onChange={(e) => setCatSlug(e.target.value)}
            >
                <option value="fashion">fashion</option>
                <option value="lifestyle">lifestyle</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="technology">technology</option>
            </select>
            <div className={styles.editor}>
                <button
                    className={styles.button}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Image src="/plus.png" alt="" width={16} height={16} />
                </button>
                {
                    isOpen &&
                    <div className={styles.add}>
                        <input
                            style={{
                                display: "none"
                            }}
                            type="file"
                            id="image"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className={styles.addButton}>
                            <label htmlFor="image">
                                <Image src="/image.png" alt="" width={16} height={16} className={styles.img} />
                            </label>
                        </button>
                    </div>
                }
            </div>
            <ReactQuill
                theme="bubble"
                className={styles.textArea}
                value={value}
                onChange={setValue}
                placeholder='Tell your story...'
            />

            <button
                className={styles.publish}
                onClick={handleSubmit}
            >
                Publish
            </button>
        </div>
    )
};

export default WritePage;

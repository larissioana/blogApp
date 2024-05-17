"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return <div className={theme}>
            {children}
        </div>
    }
};

export default ThemeProvider;

"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ModeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const SWITCH = () => {
        switch (resolvedTheme) {
            case "light":
                setTheme("dark");
                break;
            case "dark":
                setTheme("light");
                break;

            case "system":
                setTheme(systemTheme === "light" ? "dark" : "light");
                break;
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={SWITCH}
            className="size-4 flex items-center justify-center relative border 5 rounded-2xl cursor-pointer"
        >
            <SunIcon
                size={14}
                className="rotate-0 absolute inset-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0 text-black dark:text-white "
            />
            <MoonIcon
                size={14}
                className="rotate-90 absolute inset-0 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100"
            />
        </button>
    );
};

export default ModeToggle;
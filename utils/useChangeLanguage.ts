"use client";
import { useEffect, useState } from "react";
import i18next from "i18next";

export default function useChangeLanguage() {
  const [language, setLanguage] = useState(() => {
    // Check local storage first, otherwise use i18next's default language
    return (
      (typeof window !== "undefined" && localStorage.getItem("lang")) ||
      i18next.language
    );
  });

  useEffect(() => {
    // Initialize language from local storage or default to i18next language
    const storedLanguage =
      typeof window !== "undefined" && localStorage.getItem("lang");
    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
      setLanguage(storedLanguage);
    } else {
      typeof window !== "undefined" &&
        localStorage.setItem("lang", i18next.language);
    }
  }, []);

  const changeLanguageHandler = (lang: string) => {
    if (typeof window !== "undefined") {
      typeof window !== "undefined" && localStorage.setItem("lang", lang);
    }
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  // Check if the language is Persian
  const isPersian = language === "fa";

  return { language, isPersian, changeLanguageHandler };
}

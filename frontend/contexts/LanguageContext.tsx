"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        "app.name": "SubsiGuard",
        "app.tagline": "Official Government Fraud Detection Portal",
        "nav.home": "Home",
        "nav.dashboard": "Dashboard",
        "nav.audit": "Audit Center",
        "nav.login": "Login",
        "nav.logout": "Logout",
        "hero.sovereign": "Safeguarding India's",
        "hero.benefits": "Public Benefits",
        "hero.description": "Advanced AI-driven auditing for Direct Benefit Transfers. Preventing leakage, ensuring compliance, and protecting the intended beneficiary.",
        "hero.cta.dashboard": "Access Dashboard",
        "hero.cta.learn": "Learn How It Works",
        "stats.beneficiaries": "Total Beneficiaries",
        "stats.leakage": "Leakage Prevented",
        "stats.anomalies": "Flagged Anomalies",
        "stats.coverage": "Active Coverage",
        "dash.overview": "Overview",
        "dash.live_monitoring": "Live Monitoring",
        "dash.upload": "Upload Data",
        "dash.analyzing": "Analyzing Dataset...",
        "dash.export": "Export Report",
        "dash.welcome": "Welcome Back",
    },
    hi: {
        "app.name": "सब्सिडी गार्ड",
        "app.tagline": "आधिकारिक सरकारी धोखाधड़ी जांच पोर्टल",
        "nav.home": "मुख्य पृष्ठ",
        "nav.dashboard": "डैशबोर्ड",
        "nav.audit": "ऑडिट केंद्र",
        "nav.login": "लॉग इन",
        "nav.logout": "लॉग आउट",
        "hero.sovereign": "भारत के",
        "hero.benefits": "सार्वजनिक लाभों की सुरक्षा",
        "hero.description": "डीबीटी हस्तांतरण के लिए उन्नत एआई-आधारित ऑडिट। लीकेज को रोकना, अनुपालन सुनिश्चित करना और लक्षित लाभार्थी की सुरक्षा करना।",
        "hero.cta.dashboard": "डैशबोर्ड एक्सेस करें",
        "hero.cta.learn": "यह कैसे काम करता है",
        "stats.beneficiaries": "कुल लाभार्थी",
        "stats.leakage": "रोकी गई लीकेज",
        "stats.anomalies": "संदिग्ध मामले",
        "stats.coverage": "सक्रिय कवरेज",
        "dash.overview": "अवलोकन",
        "dash.live_monitoring": "लाइव निगरानी",
        "dash.upload": "डेटा अपलोड करें",
        "dash.analyzing": "डेटासेट का विश्लेषण हो रहा है...",
        "dash.export": "रिपोर्ट निर्यात करें",
        "dash.welcome": "वापसी पर स्वागत है",
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

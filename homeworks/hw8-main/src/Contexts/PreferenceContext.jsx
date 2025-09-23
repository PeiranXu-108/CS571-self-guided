import { createContext } from "react";

const PreferenceContext = createContext({
    preferences: {},
    setPreferences: () => { }
});

export default PreferenceContext;
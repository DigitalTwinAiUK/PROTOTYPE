const STORAGE_KEY = 'dtai_ai_settings';

// Default settings from initialData.js (will be imported)
let defaultSettings = {
  personas: {},
  machines: [],
};

// Function to load settings from localStorage
export const loadSettings = () => {
  try {
    const serializedSettings = localStorage.getItem(STORAGE_KEY);
    if (serializedSettings === null) {
      // If no settings are found, return the default settings
      return defaultSettings;
    }
    // Merge loaded settings with defaults to ensure all keys exist
    const loaded = JSON.parse(serializedSettings);
    return { ...defaultSettings, ...loaded };
  } catch (error) {
    console.error("Error loading settings from localStorage:", error);
    return defaultSettings;
  }
};

// Function to save settings to localStorage
export const saveSettings = (settings) => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem(STORAGE_KEY, serializedSettings);
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

// Function to set the default settings (called once from LiveAI)
export const setDefaultSettings = (personas, machines, coreRules, colors) => {
    const themes = {
        'Default': colors
    };
    defaultSettings = { personas, machines, coreRules, colors, themes };
}

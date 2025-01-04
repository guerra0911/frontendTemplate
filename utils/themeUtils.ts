import api from '@/api'; // Ensure correct path to your API instance

/**
 * Toggles the theme between light and dark, updates state, and syncs with backend.
 * @param theme - Current theme ('light' or 'dark').
 * @param setTheme - State updater function for the theme.
 */
export const toggleTheme = async (theme: 'light' | 'dark', setTheme: (newTheme: 'light' | 'dark') => void) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);

  try {
    await api.post('/api/user/update-theme/', { theme: newTheme });
  } catch (error) {
    console.error('Error updating theme:', error);
  }
};

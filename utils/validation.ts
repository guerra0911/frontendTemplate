export const validateUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9._]{1,25}$/;
    return regex.test(username);
  };
  
export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*\d).{6,}$/;
    return regex.test(password);
};

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
  
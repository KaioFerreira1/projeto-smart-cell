export const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.trim() !== "";
};
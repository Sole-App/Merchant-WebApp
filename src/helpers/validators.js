const isEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    return regex.test(email);
}
export const storeUser = (data) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            username: data.user.username,
            jwt: data.jwt,
        })
    );
};

export const userData = () => {
    const stringifiedUser = localStorage.getItem('user');
    console.log('Retrieved user data:', stringifiedUser); // Log the retrieved data
    return stringifiedUser ? JSON.parse(stringifiedUser) : {};
};

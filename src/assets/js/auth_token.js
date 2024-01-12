const storage = localStorage;
const accessToken = {};

accessToken.saveToken = async ( token ) => {
    await storage.setItem('access_token', token);
};

accessToken.getToken = async () => {
    return await storage.getItem('access_token');
}
accessToken.clearStorage = async () => {
    await storage.clear();
}

export default accessToken;
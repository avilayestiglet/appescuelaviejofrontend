const _storage = localStorage;
const storage = {};

storage.saveToken = ( token ) => {
 _storage.setItem('access_token', token);
};

storage.getToken = () => {
    return _storage.getItem('access_token');
}

storage.isToken = () => {
    return _storage.getItem('access_token') != null ? true : false;
}
storage.empty = () => _storage.clear();

export default storage;
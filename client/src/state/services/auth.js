import api from '../http';

class AuthService {
    async register(userData) {
        return await api.post('/signup', userData);
    };

    async loadUser() {
        return await api.get('/user');
    };

    async login(userData) {
        return await api.post('/signin', userData);
    };

    async logout() {
        return await api.post('/logout');
    };

    async deleteUser() {
        return await api.delete('/user');
    };
};

export default new AuthService();
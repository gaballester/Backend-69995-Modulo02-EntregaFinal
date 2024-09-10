import userDao from '../daos/user.dao.js'

class UserRepository {
    async createUser(userData) {
        return await userDao.save(userData)
    }

    async getUserById(id) {
        return await userDao.findById(id)
    }

    async getUserByEmail(email) {
        return await userDao.findOne({email: email})
    }
}

export default new UserRepository




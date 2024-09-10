import userRepository from "../repositories/user.repository.js"
import { createHash, isValidPassword } from "../utils/util.js"

class UserService {
    async userRegister(userData) {

        const userExists = await userRepository.getUserByEmail((userData.email))
        if (userExists) throw new Error(`The user with email ${userData.email} exists in the site.`)
        userData.password = createHash(userData.password)
        return await userRepository.createUser(userData)

    }

    async userLogin(email,password) {

        const userExists = await userRepository.getUserByEmail(email)
        if(!userExists) {
            return res.status(401).send("User not Exists")
        }
        if(!isValidPassword(password,userExists)) {
            return res.status(401).send("input data error")
        }
        return userExists
    }
}

export default new UserService
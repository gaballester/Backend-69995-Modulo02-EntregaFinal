import userService from "../services/user.service.js"
import jwt from "jsonwebtoken"
import 'dotenv/config' 

class UserController {

    async register (req,res) {
        const {first_name,last_name,email,age,password} = req.body
        try {

            const newUser = await userService.userRegister({first_name,last_name,email,age,password})

            console.log('palabra secreta',process.env.JWTSECRETWORD)
            console.log('cookie',process.env.COOKIE)

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                role: newUser.role
            },process.env.JWTSECRETWORD,{expiresIn: "1h"})

            res.cookie(process.env.COOKIE,token,{maxAge: 3600000,httpOnly:true})
            res.redirect("/api/sessions/current")

        } catch (error) {
            
            res.status(500).send(error)//"Server Error in UserController")

        }
    }

    async login (req,res) {
        const {email,password} = req.body
        try {      
            const user = await userService.userLogin(email,password)
            console.log('antes del token')
            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            },process.env.JWTSECRETWORD,{expiresIn: "1h"})

            res.cookie(process.env.COOKIE,token,{maxAge: 3600000,httpOnly:true})
            console.log('antes de redirigir')
            res.redirect("/api/sessions/current")

        } catch (error) {
            res.status(500).send(error) //"Server Error in UserController")
        }
    }

    async current (req,res) {
        if (req.user) {
            res.render("current", { user: req.user})
        } else {
            res.send("user Not authorized")
        }
    }

    logout (req,res) {
        res.clearCookie(process.env.COOKIE)
        res.redirect('/login')
    }

}

export default new UserController()
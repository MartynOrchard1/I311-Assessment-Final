import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    async showLogin({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    async login({ auth, request, response, session }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')

        console.log('EMAIL:', email)
        console.log('PASSWORD:', password)

        try {
            // Manually fetch the user by email
            const user = await User.findByOrFail('email', email)

            // Use verifyCredentials to validate the password
            await auth.use('web').login(user, password)


            return response.redirect('/')
        } catch (error) {
            session.flash('error', 'Invalid credentials')
            return response.redirect('/login')
        }
    }

    async logout({ auth, response }: HttpContext) {
            await auth.use('web').logout()
            return response.redirect('/')
        }
    }

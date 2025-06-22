import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
// import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    async showLogin({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    async login({ auth, request, response, session }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')

        console.log('Login attempt:', { email, password })

        const user = await User.findBy('email', email)

        if (!user) {
            console.log(`User not found: ${email}`)
            session.flash('errors', { email: 'Invalid email or password' })
            return response.redirect().back()
        }

        // Debugging output
        console.log('Stored hash:', user.password)

        const isValid = await user.verifyPassword(password)
        console.log('Password match result:', isValid)

        if (!isValid) {
            console.log(`Invalid password for: ${email}`)
            session.flash('errors', { email: 'Invalid email or password' })
            return response.redirect().back()
        }

        await auth.use('web').login(user)
        console.log(`Logged in: ${email}`)
        return response.redirect('/dashboard')
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect('/')
    }
}

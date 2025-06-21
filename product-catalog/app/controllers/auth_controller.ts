import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async showLogin({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    async login({ auth, request, response, session }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            await (auth.use('web') as any).attempt(email, password)
            return response.redirect('/')
        } catch {
            session.flash('error', 'Invalid credentials')
            return response.redirect('/login')
        }
    }


    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect('/')
    }
}

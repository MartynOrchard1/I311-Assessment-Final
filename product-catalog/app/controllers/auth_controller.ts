import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async showLogin({ view }: HttpContext) {
        return view.render('auth/login')
    }

    public async login({ auth, request, response, session }: HttpContext) {
        
    }
}
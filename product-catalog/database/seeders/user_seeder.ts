import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run () {
    const rawPassword = 'password'
    const hashedPassword = await hash.use('scrypt').make(rawPassword)

    console.log('Seeding user:')
    console.log('Email: test@gmail.com')
    console.log('Raw password:', rawPassword)
    console.log('Hashed password:', hashedPassword)

    await User.create({
      email: 'test@gmail.com',
      fullName: 'Test User',
      password: hashedPassword,
    })
  }
}
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import Product from '#models/product'

export default class ProductsController {
    async index({ view, request }: HttpContext) {
    const products = await Product.all()
    const csrfToken = request.csrfToken
    return view.render('pages/dashboard', { products, csrfToken })
    }

    async create({ view, request }: HttpContext) {
    const csrfToken = request.csrfToken
    return view.render('pages/products/create', { csrfToken })
    }

    async store({ request, response, session }: HttpContext) {
        const image = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        })

        let imagePath = null

        if (image) {
            const fileName = `${cuid()}.${image.extname}`
            await image.move('./public/uploads', { name: fileName })
            imagePath = `/uploads/${fileName}`
        }

        const data = request.only(['name', 'price', 'description'])
        await Product.create({ ...data, image_url: imagePath })

        session.flash('success', 'Product created successfully!')
        return response.redirect().toRoute('dashboard')
    }

    async edit({ params, view, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
        return response.redirect().toRoute('dashboard') // Optional: render 404
    }

    return view.render('pages/products/edit', { product })
    }

    async update({ params, request, response, session }: HttpContext) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.redirect().toRoute('dashboard')
        }

        const data = request.only(['name', 'price', 'description'])

        const image = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        })

        if (image) {
            const fileName = `${cuid()}.${image.extname}`
            await image.move('./public/uploads', { name: fileName })
            data.image_url = `/uploads/${fileName}`
        }

        product.merge(data)
        await product.save()

        session.flash('success', 'Product updated successfully!')
        return response.redirect().toRoute('dashboard')
    }

    async destroy({ params, response, session }: HttpContext) {
        const product = await Product.find(params.id)

        if (product) {
            await product.delete()
            session.flash('success', 'Product deleted successfully!')
        }

        return response.redirect().toRoute('dashboard')
    }
}

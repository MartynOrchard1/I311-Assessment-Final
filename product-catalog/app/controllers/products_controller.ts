import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
    async index({ view }: HttpContext) {
        const products = await Product.all()
        return view.render('pages/dashboard', { products })
    }

    async create({ view, request }: HttpContext) {
    const csrfToken = request.csrfToken
    return view.render('pages/products/create', { csrfToken })
    }

    async store({ request, response, session }: HttpContext) {
        const data = request.only(['name', 'price', 'image_url']) 

        try {
            await Product.create(data)
            session.flash('success', 'Product created successfully!')
        } catch (error) {
            console.error('Product creation failed:', error)
            session.flash('error', 'Failed to create product.')
        }

        return response.redirect().toRoute('dashboard')
    }

    async edit({ params, view, response }: HttpContext) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.redirect().toRoute('dashboard') // Or render 404 if preferred
        }

        return view.render('pages/products/edit', { product })
    }


    async update({ params, request, response, session }: HttpContext) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.redirect().toRoute('dashboard')
        }

        const data = request.only(['name', 'price', 'description', 'image_url'])
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

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const produto_categoria = await prisma.produto_categoria.createMany({
        data: info
    })

    res.status(200).json(produto_categoria).end()
}

const read = async (req, res) => {
    const produto_categoria = await prisma.produto_categoria.findMany()

    res.status(200).json(produto_categoria).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const produto_categoria = await prisma.produto_categoria.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(produto_categoria).end()
}

const remove = async (req, res) => {
    const produto_categoria = await prisma.produto_categoria.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(produto_categoria).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}
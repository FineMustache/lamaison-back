const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const compra_produto = await prisma.compra_produto.createMany({
        data: info
    })

    res.status(200).json(compra_produto).end()
}

const read = async (req, res) => {
    const compra_produto = await prisma.compra_produto.findMany()

    res.status(200).json(compra_produto).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const compra_produto = await prisma.compra_produto.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(compra_produto).end()
}

const remove = async (req, res) => {
    const compra_produto = await prisma.compra_produto.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(compra_produto).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}
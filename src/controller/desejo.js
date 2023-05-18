const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const desejo = await prisma.desejo.createMany({
        data: info
    })

    res.status(200).json(desejo).end()
}

const read = async (req, res) => {
    const desejo = await prisma.desejo.findMany({
        where: {
            id_usuario: Number(req.params.id)
        },
        include: {
            produto: {
                include: {
                    categorias: {
                        include: {
                            categoria: true
                        }
                    }
                }
            }
        }
    })

    res.status(200).json(desejo).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const desejo = await prisma.desejo.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(desejo).end()
}

const remove = async (req, res) => {
    const desejo = await prisma.desejo.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(desejo).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}
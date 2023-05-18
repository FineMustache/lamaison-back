const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const categoria = await prisma.categoria.createMany({
        data: info
    })

    res.status(200).json(categoria).end()
}

const read = async (req, res) => {
    const categoria = await prisma.categoria.findMany()

    res.status(200).json(categoria).end()
}

const read15 = async (req, res) => {
    const page = req.params.page
    const tag = req.params.tag.replace('_', ' ')
    const categoria = await prisma.categoria.findMany({
        include: {
            produtos: {
                select: {
                    produto: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                            descricao: true,
                            imagem: true,
                            modelo: true,
                            mtl: true,
                            textura: true,
                            superficie: true,
                            desconto: true,
                            medidas: true,
                            categorias: {
                                select: {
                                    categoria: {
                                        select: {
                                            nome: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                skip: page * 15 - 15,
                take: 15
            }
        },
        where: {
            nome: {
                equals: tag
            }
        }
    })

    res.status(200).json(categoria).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const categoria = await prisma.categoria.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(categoria).end()
}

const remove = async (req, res) => {
    const categoria = await prisma.categoria.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(categoria).end()
}

module.exports = {
    create,
    read,
    read15,
    update,
    remove
}
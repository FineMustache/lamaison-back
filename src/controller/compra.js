const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Pix = require('./Pix')
const crypto = require('crypto')
const Email = require('../controller/email')

const create = async (req, res) => {
    const info = req.body
    var valor = 0
    req.body.produtos.forEach(async p => {
        valor += p.valor - (p.valor * p.desconto / 100)
    })
    info.valor = parseFloat(valor.toFixed(2))
    // const compra = await prisma.compra.create({
    //     data: info
    // })

    

    // req.body.produtos.forEach(async p => {
    //     await prisma.compra_produto.create({
    //         data: {
    //             id_compra: Number(compra.id),
    //             id_produto: Number(p.id)
    //         }
    //     })
    //     valor += p.valor - (p.valor * p.desconto / 100)
    // })

    res.status(200).json({...info, id: 90}).end()
}

const read = async (req, res) => {
    const compra = await prisma.compra.findMany()

    res.status(200).json(compra).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const compra = await prisma.compra.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(compra).end()
}

const remove = async (req, res) => {
    const compra = await prisma.compra.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(compra).end()
}

const test = async (req, res) => {
    // const pix = new Pix(process.env.CHAVE_PIX, `Compra de X produtos`, 'La Maison', 'Pedreira', crypto.randomBytes(32).toString('hex'), 10)
    console.log('entetent')
    // res.status(200).json({cod: pix.getPayload()}).end()
    Email.send()
    res.send('meu pai')
}

module.exports = {
    create,
    read,
    update,
    remove,
    test
}
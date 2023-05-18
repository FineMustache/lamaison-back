const { json } = require('express')
const jwt = require('jsonwebtoken')


const verificar = (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token, process.env.KEY, (err, data) => {
        console.log(data);
        if (err != null) res.status(401).json({...err, "validar": false}).end()
        else{
            console.log(data["userid"]);
            console.log(req.body.userid);
            if(data["userid"] == req.body.userid){
                res.status(200).json({"validar": true}).end()
            }
            else{
                res.status(401).json({"validar": false}).end()
            }
        }
        
    })
}

const verificarConta = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err == null) {
            req.uid = data.uid
            next()
        } else {
            res.status(400).json({validado: false}).end()
        }
    })
}

module.exports = {
    verificar,
    verificarConta
}
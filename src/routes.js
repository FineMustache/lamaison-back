const express = require('express');
const router = express.Router();

const produto = require("./controller/produtos");
const categoria = require("./controller/categoria");
const usuario = require("./controller/usuario")
const produto_categoria = require("./controller/produtoCat")
const compra = require("./controller/compra")
const compra_produto = require("./controller/compraProd")
const desejo = require("./controller/desejo")
const middleware = require("./middleware/middleware")

router.post("/produto", produto.create);
router.get("/produto", produto.read);
router.get("/produto/page/:page", produto.read15)
router.get("/produto/destaques", produto.readHl)
router.get("/produto/:id", produto.readOne)
router.get("/produtos/count", produto.readCount)
router.put("/produto", produto.update);
router.delete("/produto", produto.remove);

router.post("/categoria", categoria.create);
router.get("/categoria", categoria.read);
router.get("/categoria/:tag/:page", categoria.read15);
router.put("/categoria", categoria.update);
router.delete("/categoria", categoria.remove);

router.post("/prodC", produto_categoria.create);
router.get("/prodC", produto_categoria.read);
router.put("/prodC", produto_categoria.update);
router.delete("/prodC", produto_categoria.remove);

router.post("/compra", compra.create);
router.get("/compra", compra.read);
router.put("/compra", compra.update);
router.delete("/compra", compra.remove);
router.get("/teste", compra.test)

router.post("/compraProd", compra_produto.create);
router.get("/compraProd", compra_produto.read);
router.put("/compraProd", compra_produto.update);
router.delete("/compraProd", compra_produto.remove);

router.post("/desejo", desejo.create);
router.get("/desejo/:id", desejo.read);
router.put("/desejo", desejo.update);
router.delete("/desejo", desejo.remove);

router.post("/usuario", usuario.create);
router.post("/usuarioLogin", usuario.login);
router.post("/usuario/validar", middleware.verificar)
router.post("/usuario/verificar/", middleware.verificarConta, usuario.verify)

module.exports = router;

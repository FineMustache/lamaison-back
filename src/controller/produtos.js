const { PrismaClient } = require('@prisma/client');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();
const connectionString = process.env.AZURE_CONTAINER_CONNECTION_STRING; // Substitua pela sua string de conexão do Azure Blob Storage
const containerName = "arquivos"; // Substitua pelo nome do seu container no Azure Blob Storage

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.originalname.split('.')[0] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const uploadFile = async (containerClient, file) => {
  const blobName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(file.path);
  console.log("Salvo com sucesso (eu acho): ", blobName)
  return blobName;
};

const parser = multer({ storage });

const create = async (req, res) => {
    parser.fields([{ name: 'img' }, { name: 'textura' }, { name: 'modelo' }, { name: 'mtl' }])(req, res, async err => {
      if (err) {
        res.status(500).json({ error: 1, payload: err }).end();
      } else {
        const imgFile = req.files.img ? req.files.img[0] : null;
        const modeloFile = req.files.modelo ? req.files.modelo[0] : null;
        const mtlFile = req.files.mtl ? req.files.mtl[0] : null;
        const texturaFile = req.files.textura ? req.files.textura[0] : null;
  
        let img, modelo, mtl, textura;
  
        if (imgFile) {
          img = await uploadFile(containerClient, imgFile);
        } else {
          img = null; // ou atribua um valor padrão se desejar
        }
  
        if (modeloFile) {
          modelo = await uploadFile(containerClient, modeloFile);
        } else {
          modelo = null; // ou atribua um valor padrão se desejar
        }
  
        if (mtlFile) {
          mtl = await uploadFile(containerClient, mtlFile);
        } else {
          mtl = null; // ou atribua um valor padrão se desejar
        }
  
        if (texturaFile) {
          textura = await uploadFile(containerClient, texturaFile);
        } else {
          textura = null; // ou atribua um valor padrão se desejar
        }
  
        const produto = await prisma.produto.create({
          data: {
            nome: req.body.nome,
            valor: Number(req.body.valor),
            descricao: req.body.descricao,
            imagem: img,
            modelo: modelo,
            mtl: mtl,
            textura: textura,
            superficie: req.body.superficie,
            desconto: Number(req.body.desconto),
            medidas: req.body.medidas
          }
        });
  
        res.status(200).json(produto).end();
      }
    });
  };
  

const read = async (req, res) => {
    
    const produto = await prisma.produto.findMany({
        include: {
            categorias: {
                select: {
                    categoria: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        }
    })

    res.status(200).json(produto).end()
}

const read15 = async (req, res) => {
    const page = req.params.page
    const options = req.query
    var filter = {}
    var sort = {}
    if (options.minPrec !== undefined) {
        filter = {
            AND: [
                {
                    valor: {
                        gte: Number(options.minPrec)
                    }
                },
                {
                    valor: {
                        lte: Number(options.maxPrec)
                    }
                },
                {

                }
            ]
        }
    }


    if (options.sortPrec !== undefined) {
        sort = {
            valor: String(options.sortPrec)
        }
    }

    if (options.desconto === "true") {
        filter = {...filter,
            desconto: {
                gt: 0
            }
        }
    }

    if (options.tag !== "all" && options.tag !== undefined) {
        filter = {...filter,
            categorias: {
                some: {
                    categoria: {
                        nome: options.tag.replace('_', ' ')
                    }
                }
            }
        }
    }

    const produto = await prisma.produto.findMany({
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
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        skip: (page * 15 - 15),
        take: 15,
        where: filter,
        orderBy: sort
    })

    const count = await prisma.produto.count({
        where: filter,
    })

    res.status(200).json({produtos: produto, count}).end()
}

const readHl = async (req, res) => {
    const produto = await prisma.produto.findMany({
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
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        where: {
            desconto: {
                gt: 0
            }
        },
        orderBy: {
            desconto: 'desc'
        },
        take: 10
    })

    res.status(200).json(produto).end()
}

const readCount = async (req, res) => {
    const count = await prisma.produto.count()

    res.status(200).json({"count": count}).end()
}

const readOne = async (req, res) => {
    const page = req.params.page
    const produto = await prisma.produto.findFirst({
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
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(200).json(produto).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const produto = await prisma.produto.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(produto).end()
}

const remove = async (req, res) => {
    const produto = await prisma.produto.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(produto).end()
}

module.exports = {
    read,
    create,
    update,
    remove,
    read15,
    readHl,
    readOne,
    readCount
}

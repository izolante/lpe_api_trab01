const { getBairrosDB, addBairroDB, 
    updateBairroDB, deleteBairroDB, getBairroPorCodigoDB } 
    = require('../usecases/bairroUseCases')

const getBairros = async (request, response) => {
    // capturando o usuario que foi enviado pelo next do verificaJWT
    console.log('Usuario no getBairros' + 
    JSON.stringify(request.usuario));
    await getBairrosDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as bairros: ' + err
          }))
}

const addBairro = async (request, response) => {
    await addBairroDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Bairro criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateBairro = async (request, response) => {
    await updateBairroDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Bairro alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteBairro = async (request, response) => {
    await deleteBairroDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getBairroPorCodigo= async (request, response) => {
    await getBairroPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getBairros, addBairro, updateBairro, deleteBairro, getBairroPorCodigo
}
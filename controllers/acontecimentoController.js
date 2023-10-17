const { getAcontecimentosDB, addAcontecimentoDB, updateAcontecimentoDB, deleteAcontecimentoDB, getAcontecimentoPorCodigoDB } = require('../usecases/acontecimentoUseCases')

const getAcontecimentos = async (request, response) => {
    await getAcontecimentosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os acontecimentos: ' + err
        }));
}

const addAcontecimento = async (request, response) => {
    await addAcontecimentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Acontecimento criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAcontecimento = async (request, response) => {
    await updateAcontecimentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Acontecimento alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAcontecimento = async (request, response) => {
    await deleteAcontecimentoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getAcontecimentoPorCodigo= async (request, response) => {
    await getAcontecimentoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getAcontecimentos, addAcontecimento, updateAcontecimento, deleteAcontecimento, getAcontecimentoPorCodigo
}


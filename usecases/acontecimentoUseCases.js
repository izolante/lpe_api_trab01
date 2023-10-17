const { pool } = require('../config');
const Acontecimento = require('../entities/acontecimento')

const getAcontecimentosDB = async () => {
    try {    
        const { rows } = await pool.query(`select p.codigo as codigo, p.descricao as descricao, p.endereco as endereco, p.numero_rua as numero_rua, 
        to_char(p.data_acontecido,'YYYY-MM-DD') as data_acontecido, p.bairro as bairro, c.nome as bairro_nome
        from acontecimentos p
        join bairros c on p.bairro = c.codigo
        order by p.codigo`);
        return rows.map((acontecimento) => new Acontecimento(acontecimento.codigo, acontecimento.descricao, acontecimento.endereco, 
            acontecimento.numero_rua, acontecimento.data_acontecido, acontecimento.bairro, acontecimento.bairro_nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAcontecimentoDB = async (body) => {
    try {   
      //const { nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, bairro } = body; 
        const { descricao, endereco, numero_rua, data_acontecido, bairro } = body; 
        const results = await pool.query(`INSERT INTO acontecimentos (descricao, endereco, numero_rua, data_acontecido, bairro) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, descricao, endereco, numero_rua, to_char(data_acontecido,'YYYY-MM-DD') as data_acontecido, bairro`,
        [descricao, endereco, numero_rua, data_acontecido, bairro]);
        const acontecimento = results.rows[0];
        return new Acontecimento(acontecimento.codigo, acontecimento.descricao, acontecimento.endereco, acontecimento.numero_rua, acontecimento.data_acontecido, acontecimento.bairro, "");
    } catch (err) {
        throw "Erro ao inserir o acontecimento: " + err;
    }    
}

const updateAcontecimentoDB = async (body) => {
    try {   
        const { codigo, descricao, endereco, numero_rua, data_acontecido, bairro }  = body; 
        const results = await pool.query(`UPDATE acontecimentos set descricao = $2 , endereco = $3, numero_rua = $4, 
        data_acontecido = $5, bairro = $6 where codigo = $1 
        returning codigo, descricao, endereco, numero_rua, to_char(data_acontecido,'YYYY-MM-DD') as data_acontecido, bairro`,
        [codigo, descricao, endereco, numero_rua, data_acontecido, bairro]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const acontecimento = results.rows[0];
        return new Acontecimento(acontecimento.codigo, acontecimento.descricao, acontecimento.endereco, 
            acontecimento.numero_rua, acontecimento.data_acontecido, acontecimento.bairro, "");
    } catch (err) {
        throw "Erro ao alterar o acontecimento: " + err;
    }      
}

const deleteAcontecimentoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM acontecimentos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Acontecimento removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o acontecimento: " + err;
    }     
}

const getAcontecimentoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select p.codigo as codigo, p.descricao as descricao, p.endereco as endereco, p.numero_rua as numero_rua, 
        to_char(p.data_acontecido,'YYYY-MM-DD') as data_acontecido, p.bairro as bairro, c.nome as bairro_nome
        from acontecimentos p
        join bairros c on p.bairro = c.codigo where p.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const acontecimento = results.rows[0];
            return new Acontecimento(acontecimento.codigo, acontecimento.descricao, acontecimento.endereco, 
                acontecimento.numero_rua, acontecimento.data_acontecido, acontecimento.bairro, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o acontecimento: " + err;
    }     
}

module.exports = {
    getAcontecimentosDB, addAcontecimentoDB, updateAcontecimentoDB, deleteAcontecimentoDB, getAcontecimentoPorCodigoDB
}

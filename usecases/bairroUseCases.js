const { pool } = require('../config');
const Bairro = require('../entities/bairro');

const getBairrosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM bairros ORDER BY nome`);
        return rows.map((bairro) => new Bairro(bairro.codigo, bairro.nome));
    } catch (err){
        throw "Erro: " + err;
    }
}

const addBairroDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO bairros (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const bairro = results.rows[0];
        return new Bairro(bairro.codigo, bairro.nome); 
    } catch (err) {
        throw "Erro ao inserir a bairro: " + err;
    }    
}


const updateBairroDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE bairros set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const bairro = results.rows[0];
        return new Bairro(bairro.codigo, bairro.nome); 
    } catch (err) {
        throw "Erro ao alterar a bairro: " + err;
    }      
}

const deleteBairroDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM bairros where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Bairro removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a bairro: " + err;
    }     
}

const getBairroPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM bairros where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const bairro = results.rows[0];
            return new Bairro(bairro.codigo, bairro.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a bairro: " + err;
    }     
}

module.exports = {
    getBairrosDB, addBairroDB, updateBairroDB, deleteBairroDB, getBairroPorCodigoDB
}
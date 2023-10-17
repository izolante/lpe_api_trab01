class Acontecimento {
    constructor(codigo, descricao, endereco, numero_rua, data_acontecido, bairro, bairro_nome) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.endereco = endereco;
        this.numero_rua = numero_rua;
        this.data_acontecido = data_acontecido;
        this.bairro = bairro;
        this.bairro_nome = bairro_nome;
    }
}

module.exports = Acontecimento;
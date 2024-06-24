import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ")

        super(`O seguintes erros forma encontrados: ${mensagensErro}`)
    }
}

export default ErroValidacao
import mongoose from "mongoose"

/* eslint-disable no-unused-vars */
function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"})
    } else if(erro instanceof mongoose.Error.ValidationError){
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ")
        res.status(400).send({message: `O seguintes erros forma encontrados: ${mensagensErro}`})
    } else {
        res.status(500).send({message: `${erro.message} - Erro interno do servidor`});
    }
}

export default manipuladorDeErros
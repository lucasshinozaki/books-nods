import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String, 
        required: [true, "O titulo do livro é obrigatório"]
    },
    preco: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 5000
            },
            message: "O valor deve estar entre 10 a 5000. Valor fornecido {VALUE}"
        }
    },
    paginas: {
        type: Number,
        min: [10, "O numero de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"],
        max: [5000, "O numero de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"]
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) autor(a) é obrigatório"]
    },
    editora: {
        type: String,
        required: [true, "A editora é obrigatório"],
        enum: {
            values: ["Casa do Código", "Alura"],
            message: "A editora {VALUE} forneceida não é um valor fornecida"
        }
    }
}, {versionKey: false})

const livro = mongoose.model("livros", livroSchema)

export default livro
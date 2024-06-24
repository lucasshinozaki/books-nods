import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String, 
        required: [true, "O titulo do livro é obrigatório"]
    },
    preco: {type: Number},
    paginas: {type: Number},
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) autor(a) é obrigatório"]
    },
    editora: {
        type: String,
        required: [true, "A editora é obrigatório"]
    }
}, {versionKey: false})

const livro = mongoose.model("livros", livroSchema)

export default livro
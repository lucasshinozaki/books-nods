import {autor} from "../models/Autor.js"

class AutorController {

    static async listarAutor (req, res) {
        try {
            const listaAutor = await livro.find({})
            res.status(200).json(listaAutor)
        } catch (erro) {
            res.status(500).json({message: `${erro.message} -> falha na requisição`})
        }
    }

    static async listarAutorPorId (req, res) {
        try {
            const id = req.params.id
            const autorEncontrado = await autor.findById(id)
            res.status(200).json(autorEncontrado)
        } catch (erro) {
            res.status(500).json({message: `${erro.message} -> falha na requisição do autor`})
        }
    }

    static async autalizarAutor (req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndUpdate(id, req.body)
            res.status(200).json({message: "autor atualizado"})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} -> falha ao atualiza o autor`})
        }
    }

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body)
            res.status(201).json({ message: "criado com sucesso", autor: novoAutor})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} -> falha ao cadastrar o autor`})
        }
    }

    static async deletarAutor (req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndDelete(id)
            res.status(200).json({message: "autor excluido com sucesso"})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} -> falha na exclusão`})
        }
    }

}

export default AutorController
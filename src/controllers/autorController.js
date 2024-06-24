import {autor} from "../models/Autor.js"
import mongoose from "mongoose";

class AutorController {

    static listarAutores = async (req, res) => {
        try {
          const autoresResultado = await autor.find();   
          res.status(200).json(autoresResultado);
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} Erro interno no servidor` });
        }
      };

      static listarAutorPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const autorResultado = await autor.findById(id);

          if (autorResultado !== null) {
            res.status(200).send(autorResultado);
          } else {
            res.status(404).send({message: `Id do Autor não localizado.`})
          }
          
        } catch (erro) {
          if (erro instanceof mongoose.Error.CastError) {
            res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"})
          } else {
            res.status(500).send({message: `${erro.message} - Erro interno do servidor`});
          }
        }
      }

      static atualizarAutor = async (req, res) => {
        try {
          const id = req.params.id;
    
          await autor.findByIdAndUpdate(id, {$set: req.body});
    
          res.status(200).send({message: "Autor atualizado com sucesso"});
        } catch (erro) {
          res.status(500).send({message: erro.message});
        }
      }

    static cadastrarAutor = async (req, res) => {
        try {
          let autor = new autor(req.body);
    
          const autorResultado = await autor.save();
    
          res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
          res.status(500).send({message: `${erro.message} - falha ao cadastrar Autor.`});
        }
      }

      static excluirAutor = async (req, res) => {
        try {
          const id = req.params.id;
    
          await autor.findByIdAndDelete(id);
    
          res.status(200).send({message: "Autor removido com sucesso"});
        } catch (erro) {
          res.status(500).send({message: erro.message});
        }
      }

}

export default AutorController
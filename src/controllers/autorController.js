import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

//import mongoose from "mongoose";

class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
          const autoresResultado = await autor.find();   
          res.status(200).json(autoresResultado);
        } catch (erro) {
          next(erro)
        }
      };

      static listarAutorPorId = async (req, res, next) => {
        try {
          const id = req.params.id;
          const autorResultado = await autor.findById(id);

          if (autorResultado !== null) {
            res.status(200).send(autorResultado);
          } else {
            next(new NaoEncontrado("Id do Autor não localizado."))
          }
          
        } catch (erro) {
          next(erro)
        }
      }

      static atualizarAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const autorResultado = await autor.findByIdAndUpdate(id, {$set: req.body});
    
          if (autorResultado !== null) {
            res.status(200).send({message: "Autor atualizado com sucesso"});
          } else {
            next(new NaoEncontrado("Id do Autor não localizado"))
          }
        } catch (erro) {
          next(erro)
        }
      }

    static cadastrarAutor = async (req, res, next) => {
        try {
          let autores = new autor(req.body);
    
          const autorResultado = await autores.save();
    
          res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
          next(erro)
        }
      }

      static excluirAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const autorResultado = await autor.findByIdAndDelete(id);

          if(autorResultado !== null ) {
            res.status(200).send({message: "Autor removido com sucesso"});            
          } else {
            next(new NaoEncontrado("Id do Autor não encontrado"))
          }
    
        } catch (erro) {
          next(erro)
        }
      }

}

export default AutorController
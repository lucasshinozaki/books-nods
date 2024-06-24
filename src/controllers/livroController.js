import NaoEncontrado from "../erros/NaoEncontrado.js";
import livro from "../models/Livro.js"

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
          const livrosResultado = await livro.find()
            .populate("autor")
            .exec();
          
          res.status(200).json(livrosResultado);
          
        } catch (erro) {
            next(erro)
        }
      };

      static listarLivroPorId = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const livroResultados = await livro.findById(id)
            .populate("autor", "nome")
            .exec();

          if (livroResultados !== null) {
              res.status(200).json(livroResultados);
          } else {
              next(new NaoEncontrado("Id do livro não encontrado"))
          }
        } catch (erro) {
            next(erro)
        }
      };

      static atualizarLivro = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const livroResultado = await livro.findByIdAndUpdate(id, {$set: req.body});
          
          if(livroResultado !== null) {
            res.status(200).send({message: "Livro atualizado com sucesso"});
          } else {
            next(new NaoEncontrado("Id do livro não localizado"))
          }
        } catch (erro) {
            next(erro)
        }
      };

    static cadastrarLivro = async (req, res, next) => {
        try {
          const livros = new livro(req.body);
        
          const livroResultado = await livros.save();
    
          res.status(201).send(livroResultado.toJSON());
        } catch (erro) {
            next(erro)
        }
      }

      static deletarLivro = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const livroResultado = await livro.findByIdAndDelete(id);
          if(livroResultado !== null) {
            res.status(200).send({message: "Livro removido com sucesso"});
          } else {
            next(new NaoEncontrado("Id do livro não encontrado"))
          }
    
        } catch (erro) {
            next(erro)
        }
      };

      static listarLivroPorEditora = async (req, res, next) => {
        try {
          const editora = req.query.editora;
    
          const livrosResultado = await livro.find({"editora": editora});
    
          res.status(200).send(livrosResultado);
        } catch (erro) {
            next(erro)
        }
      };

}

export default LivroController
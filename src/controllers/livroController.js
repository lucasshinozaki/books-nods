import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autor, livro} from "../models/index.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
          let {limite = 5, pagina = 1} = req.query

          limite = parseInt(limite)
          pagina = parseInt(pagina)

          if(limite > 0 && pagina > 0) {
            const livrosResultado = await livro.find()
              .skip((pagina - 1) * limite)
              .limit(limite)
              .populate("autor")
              .exec()
          
            res.status(200).json(livrosResultado);
          } else {
            next(new RequisicaoIncorreta())
          }

          
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

      static listarLivroPorFiltro = async (req, res, next) => {
        try {
          const busca = await processaBusca(req.query)
    
          const livrosResultado = await livro
            .find(busca)
  
          res.status(200).send(livrosResultado);
        } catch (erro) {
            next(erro)
        }
      };

}

async function processaBusca(paramentro) {
  const {editora, titulo, minPagina, maxPaginas, nomeAutor} = paramentro;
  //const regex = new RegExp(titulo, "i")
  const busca = {}

  if(editora) busca.editora = editora
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"}

  if(minPagina || maxPaginas) busca.paginas = {}
  // gte = greater than or equal = maior ou igual que
  if(minPagina) busca.paginas.$gte  = minPagina
  // lte = less than or equal = menor ou igual que
  if(maxPaginas) busca.paginas.$lte = maxPaginas

  if (nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });
    if (autorEncontrado) {
      busca.autor = autorEncontrado._id.toString(); 
    } else {
      throw new NaoEncontrado("Autor não encontrado");
    }
  }
  console.log(busca)
  return busca
}

export default LivroController
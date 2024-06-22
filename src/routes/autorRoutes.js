import express from "express"
import AutorController from "../controllers/autorController.js"

const routes = express.Router()

routes.get("/autor", AutorController.listarAutor)
routes.get("/autor/:id", AutorController.listarAutorPorId)
routes.post("/autor", AutorController.cadastrarAutor)
routes.put("/autor/:id", AutorController.autalizarAutor)
routes.delete("/autor/:id", AutorController.deletarAutor)

export default routes
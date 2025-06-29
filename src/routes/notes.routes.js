const { Router } = require("express");
const NotesControllers = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const notesRoutes = Router();
const notesController = new NotesControllers();

// Ao invés de aplicar o middleware, rota por rota, fazendo a declaração desta linha abaixo, aplicamos ele a todas as rotas a seguir ao mesmo tempo!
notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes; // Exportando o notesRoutes criado neste arquivo para que demais arquivos possam utilizar o mesmo
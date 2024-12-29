const { Router } = require("express");
const NotesControllers = require("../controllers/NotesController");
const notesRoutes = Router();
const notesController = new NotesControllers();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes; // Exportando o notesRoutes criado neste arquivo para que demais arquivos possam utilizar o mesmo
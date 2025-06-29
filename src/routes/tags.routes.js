const { Router } = require("express");
const TagsControllers = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const tagsRoutes = Router();
const tagsController = new TagsControllers();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes; // Exportando o tagsRoutes criado neste arquivo para que demais arquivos possam utilizar o mesmo
const { Router } = require("express");
const UsersController = require("../controllers/UsersControllers");
const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes; // Exportando o userRoutes criado neste arquivo para que demais arquivos possam utilizar o mesmo
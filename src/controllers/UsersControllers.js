/*
    Como boa prática, um controller deve possuir no máximo 5 métodos / funções, se um controller possuir mais do que isso, vale a pena segregar em diferentes controladores.
    Podemos então através de um controlador definir um CRUD, com as seguintes possibilidades de métodos a serem implementados:

    Create: POST para criar um registro.
    Read: {
        Index: GET para listar vários registros.
        Show: GET para exibir um registro específico.
    }
    Update: PUT para atualizar um registro.
    Delete: DELETE para remover um registro.
*/
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const database = await sqliteConnection();
        const checkUserExists = await database.get(
            "SELECT * FROM users WHERE email = (?)",
            [email]
        );

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password) VALUES ( ? , ? , ?)",
            [name, email, hashedPassword]
        );

        return response.status(201).json();
    }

    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user){
            throw new AppError("Usuário não encontrado.");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.");
        }

        // Nullish coalescing operator (??): Significa que se existir conteúdo no primeiro termo o mesmo será utilizado, caso contrário o segundo deverá ser atribuído
        user.name = name ?? user.name; 
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        );

        return response.status(200).json();
    }
}

module.exports = UsersController;
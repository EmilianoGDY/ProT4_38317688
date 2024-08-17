import {pool} from './database.js';


class LibroController{

    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res){
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=${req.query.id}`);
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.publicacion, libro.isbn]);
        res.json({"Id insertado":result.insertId});
    }


}

export const libro = new LibroController();





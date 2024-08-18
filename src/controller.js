import { pool } from './database.js';

class LibroController {
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [req.query.id]);
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async add(req, res) {
        try {
            const { nombre, autor, categoria, publicacion, isbn } = req.body;
            const [result] = await pool.query(
                'INSERT INTO libros(nombre, autor, categoria, publicacion, isbn) VALUES (?, ?, ?, ?, ?)',
                [nombre, autor, categoria, publicacion, isbn]
            );
            res.json({ idInsertado: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body;
            const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                res.json({ message: 'Libro eliminado' });
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id, nombre, autor, categoria, publicacion, isbn } = req.body;
            const [result] = await pool.query(
                'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, publicacion = ?, isbn = ? WHERE id = ?',
                [nombre, autor, categoria, publicacion, isbn, id]
            );
            if (result.changedRows > 0) {
                res.json({ message: 'Libro actualizado' });
            } else {
                res.status(404).json({ message: 'Libro no encontrado o no modificado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const libro = new LibroController();






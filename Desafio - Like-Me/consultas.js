// Importar módulos necesarios
const { Pool } = require('pg');

// Crear nueva instancia de la clase Pool, con objeto de configuración
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "password",
    port: 5432,
    database: "likeme",
});

// Función asincrónica para insertar un post
const insertar = async (datos) => {
    const consulta = {
        text:'INSERT INTO posts (usuario,url,descripcion,likes) VALUES ($1,$2,$3,0) RETURNING *;',
        values: datos,
    };

    try {
        const result = await pool.query(consulta);
        return result; 
    } catch (error) {
        console.log;
        return error;
    }
};

// Función asincrónica para consultar posts
const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

// Función asincrónica para editar un usuario
const editar = async (id) => {

    try {
        const result = await pool.query(`UPDATE posts SET
                                            likes = likes + 1
                                            WHERE id = ${id} RETURNING *`);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};


// Exportando funciones
module.exports = { insertar,consultar,editar };
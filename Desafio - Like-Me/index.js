// Importar módulos necesarios
const http = require('http');
const url = require('url');
const fs = require('fs');

// Importando funciones
const { insertar,consultar,editar } = require('./consultas');

// Crear servidor
http
    .createServer( async (req,res) => {

        // Ruta raíz
        if( req.url == '/' && req.method == 'GET') {
            res.setHeader('content-type','text/html');
            const html = fs.readFileSync('index.html','utf8');
            res.end(html);
        }

        // Ruta POST de url = '/post'
        if ( req.url == '/post' && req.method == 'POST') {
            let body= '';
            
            req.on('data',(chunk) => {
                body += chunk;
            })

            req.on('end', async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await insertar(datos);
                res.end(JSON.stringify(respuesta,null,1));
            })
        }

        // Ruta GET de url = '/posts'
        if (req.url == "/posts" && req.method === "GET") {
            const registros = await consultar();
            res.end(JSON.stringify(registros,null,1));
        }

        // Ruta PUT de url = '/post'
        if (req.url.startsWith('/post?') && req.method == "PUT") {

            const { id } = url.parse(req.url, true).query;
            const respuesta = await editar(id);
            res.end(JSON.stringify(respuesta));
        }

    })
    .listen(3000,()=>console.log(`Server running on port 3000 and PID: ${process.pid}`));
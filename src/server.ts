import http from 'http';
import url from 'url';
import { readFile } from 'fs/promises';

//server
const server = http.createServer(async (request, response) => {
    const { method } = request;
    const parsedUrl = url.parse(request.url || '', true);
    const { pathname, query } = parsedUrl;
    const fileName = query.filename as string | undefined;

    // Allow CORS policy headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // CORS Pre-flight check
    if (method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    // Home route
    if (pathname === "/" && method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Home page</h1>");
        return;
    }

    // View image route
    if (pathname === "/view-image" && fileName && method === "GET") {
        try {
            const data = await readFile(`./dist/images/veryhappydog.jpg`);
            response.writeHead(200, { "Content-Type": "image/jpeg" });
            response.end(data);
        } catch (err) {
            console.error(err);
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Image cannot be displayed");
        }
        return;
    }

    // 404 Fallback
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found!");
});

//for view the image
//http://localhost:3700/view-image?filename=veryhappydog.jpg

const PORT = process.env.PORT || 3700;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

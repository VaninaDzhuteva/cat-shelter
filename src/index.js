import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    let html;
    switch (req.url) {
        case '/':
            html = await homeView();
        break;

        case '/cats/add-breed': 
            html = await addBreedView(); 
        break;

        case '/cats/add-cat': 
            html = await addCatView(); 
        break;

        case '/styles/site.css':
            const siteCss = await fs.readFile('./src/styles/site.css', {encoding: "utf-8"})
            res.writeHead(200, {
                "content-type" : 'text/css'
            });

            res.write(siteCss);
        return res.end();

        default:
            return res.end();
    }

    res.writeHead(200, {
        "content-type" : "text/html",
    });

    res.write(html);

    res.end();
});

function renderView(path) {
    return fs.readFile(path, {encoding: "utf-8"})
}

async function homeView() {
    return await renderView('./src/views/home/index.html');
}

async function addBreedView() {
    return await renderView('./src/views/addBreed.html');
}

async function addCatView() {
    return await renderView('./src/views/addCat.html');
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');

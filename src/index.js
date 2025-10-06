import http from 'http';
import fs from 'fs/promises';

import cats from './cats.js';

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
            const siteCss = await readFile('./src/styles/site.css')
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

function readFile(path) {
    return fs.readFile(path, {encoding: "utf-8"})
}

async function homeView() {
    const html = await readFile('./src/views/home/index.html');

    const catsHtml = cats.map(cat => catTemplate(cat)).join('\n');

    const result = html.replace('{{cats}}', catsHtml);

    return result;
}

async function addBreedView() {
    return await readFile('./src/views/addBreed.html');
}

async function addCatView() {
    return await readFile('./src/views/addCat.html');
}

function catTemplate(cat) {
    return `
        <li>
                    <img src="${cat.imageUrl}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>
                        ${cat.description}
                    </p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="">Change Info</a></li>
                        <li class="btn delete"><a href="">New Home</a></li>
                    </ul>
                </li>
    `
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');

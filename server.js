// eu amo js confia
const express = require('express');
const fs = require('fs');
const dir = './meuCardapio';
const express = require('express');
const path = require('path');
const app = express();

// Rota raiz que serve o arquivo o meu site maravilhoso :3
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cafe.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log('Diretório criado com sucesso!');
}

// salva o arquivo neste diretório
const filePath = `${dir}/Cafe.txt`;
fs.appendFileSync(filePath, 'Dados do cardápio\n');


app.use(express.json()); // Para suportar JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Suportar o site aka: URL-encoded bodies

// Rota para adicionar um item ao cardápio muito feio q fiz
app.post('/adicionar', (req, res) => {
    const { nome, preco } = req.body;
    fs.appendFileSync('Cafe.txt', `Nome: ${nome}, Preço: R$${preco}\n`);
    res.send('Item adicionado com sucesso!');
});

// Rota para listar todos os itens do cardápio
app.get('/listar', (req, res) => {
    const itens = fs.readFileSync(filePath, 'utf8');
    res.send(itens);
});
const port = 3000; // se o codigo não for nessa porta eu ficarei mt triste
// Inicia o servidor bacana
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
// esse ); é eu toda vez q eu tenho q mexer com js
// rezando pro node.js funcionar
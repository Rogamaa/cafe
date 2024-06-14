const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // A porta deve ser declarada antes de ser usada

// Serve arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota raiz que serve o arquivo 'cafe.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cafe.html'));
});

// Middleware para suportar JSON-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Diretório para salvar os dados do cardápio
const dir = './meuCardapio';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log('Diretório criado com sucesso!');
}

// Caminho do arquivo onde os dados do cardápio serão salvos
const filePath = `${dir}/Cafe.txt`;
fs.appendFileSync(filePath, 'Dados do cardápio\n');

// Rota para adicionar um item ao cardápio
app.post('/adicionar', (req, res) => {
    const { nome, preco } = req.body;
    fs.appendFileSync(filePath, `Nome: ${nome}, Preço: R$${preco}\n`);
    res.send('Item adicionado com sucesso!');
});

// Rota para listar todos os itens do cardápio
app.get('/listar', (req, res) => {
    const itens = fs.readFileSync(filePath, 'utf8');
    res.send(itens);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

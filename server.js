// eu amo js confia
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const dir = './meuCardapio';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log('Diretório criado com sucesso!');
}

// Agora você pode salvar o arquivo "Cafe.txt" neste diretório
const filePath = `${dir}/Cafe.txt`;
fs.appendFileSync(filePath, 'Dados do cardápio\n');


app.use(express.json()); // Para suportar JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Suportar o site aka: URL-encoded bodies

// Rota para adicionar um item ao cardápio
app.post('/adicionar', (req, res) => {
    const { nome, preco } = req.body;
    fs.appendFileSync('Cafe.txt', `Nome: ${nome}, Preço: R$${preco}\n`);
    res.send('Item adicionado com sucesso!');
});

// Rota para listar todos os itens
app.get('/listar', (req, res) => {
    const itens = fs.readFileSync('Cafe.txt', 'utf8');
    res.send(itens);
});

// Outras rotas para excluir, alterar e buscar itens seriam adicionadas aqui

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
// esse ); é eu toda vez q eu tenho q mexer com js
// rezando pro node.js funcionar
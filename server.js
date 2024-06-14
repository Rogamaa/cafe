const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

//pasta
app.use(express.static(path.join(__dirname, 'Loja')));

//'cafe.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Loja', 'cafe.html'));
});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// dados do cardápio
const dir = path.join(__dirname, 'meuCardapio');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

//onde os dados do cardápio serão salvos
const filePath = path.join(dir, 'Cafe.txt');
fs.appendFileSync(filePath, 'Dados do cardápio\n');

//adicionar um item ao cardápio
app.post('/adicionar', (req, res) => {
    const { nome, preco } = req.body;
    fs.appendFileSync(filePath, `Nome: ${nome}, Preço: R$${preco}\n`);
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    const port = 3000;
    
    // Pasta onde os arquivos estáticos estão localizados
    app.use(express.static(path.join(__dirname, 'Loja')));
    
    // Rota raiz que serve o arquivo 'cafe.html'
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'Loja', 'cafe.html'));
    });
    
    // Middlewares para suportar JSON e URL-encoded bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Rota para alterar um item do cardápio
    app.put('/alterar', (req, res) => {
        const { nomeItem, novoNome, novoPreco } = req.body;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return res.status(500).send('Erro ao ler o arquivo.');
            }
            let linhas = data.split('\n');
            let itemAlterado = false;
            linhas = linhas.map(linha => {
                if (linha.includes(`Nome: ${nomeItem}`)) {
                    itemAlterado = true;
                    return `Nome: ${novoNome}, Preço: R$${novoPreco}`;
                }
                return linha;
            });
            if (itemAlterado) {
                fs.writeFile(filePath, linhas.join('\n'), (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo:', err);
                        return res.status(500).send('Erro ao escrever no arquivo.');
                    }
                    res.send('Item alterado com sucesso!');
                });
            } else {
                res.status(404).send('Item não encontrado para alteração.');
            }
        });
    });
    
    

// Rota para alterar um item do cardápio
app.put('/alterar/:id', (req, res) => {
    const { id } = req.params;
    const { novoNome, novoPreco } = req.body;
    
    res.send('Item alterado com sucesso!');
});
//listar todos os itens do cardápio
app.get('/listar', (req, res) => {
    const itens = fs.readFileSync(filePath, 'utf8');
    res.send(itens);
});

// Inicia o servidor (que odeia css por algum motivo)
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
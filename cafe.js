document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    addItem(itemName, itemPrice);
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
});

function addItem(name, price) {
    const menuItems = document.getElementById('menuItems');
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `Nome: ${name}, Preço: R$${price}`;
    menuItems.appendChild(itemDiv);
    const fs = require('fs');
    const path = './Cafe.txt';
    
    // adicin
    function addItemToFile(itemName, itemPrice) {
        const itemData = `Nome: ${itemName}, Preço: R$${itemPrice}\n`;
        fs.appendFile(path, itemData, (err) => {
            if (err) throw err;
            console.log('Item adicionado com sucesso!');
        });
    }
    
    // Exemplo be maneiro B)
    addItemToFile('Café Expresso', '3.50');
    
}

function excluirItem(nomeItem) {
}
function alterarItem(nomeItem, novoNome, novoPreco) {
}

function buscarItem(nomeItem) {
}

function listarItens() {
}

// js é bem parecido com lua, legal.
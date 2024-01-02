const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Simulação de um banco de dados temporário
const users = [];

// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { usuario, senha, confirmacaoSenha } = req.body;

    // Simples validação
    if (!usuario || !senha || !confirmacaoSenha) {
        return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
    }

    // Verifica se a senha e a confirmação são iguais
    if (senha !== confirmacaoSenha) {
        return res.status(400).json({ mensagem: 'A senha e a confirmação de senha não correspondem.' });
    }

    // Verifica se o usuário já está cadastrado
    if (users.some(user => user.usuario === usuario)) {
        return res.status(400).json({ mensagem: 'Este usuário já está cadastrado.' });
    }

    // Adiciona o usuário à lista (simulação de persistência)
    users.push({ usuario, senha });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});


// Rota para login
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Simples validação
    if (!usuario || !senha) {
        return res.status(400).json({ mensagem: 'Por favor, forneça o usuário e a senha.' });
    }

    // Verifica se o usuário existe
    const user = users.find(user => user.usuario === usuario && user.senha === senha);

    if (!user) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // Retorna o nome do usuário no caso de um login bem-sucedido
    res.status(200).json({ mensagem: 'Login bem-sucedido!', nomeUsuario: usuario });
});

// Rota para a página de parabéns
app.get('/parabens', (req, res) => {
    const nomeUsuario = req.query.nome || 'Usuário';
    res.sendFile(path.join(__dirname, 'parabens.html'));
});


// Rota básica para o método GET na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/functions.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'functions.js'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

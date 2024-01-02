async function cadastrar() {
    const usuario = document.getElementById('cadastroUsuario').value;
    const senha = document.getElementById('cadastroSenha').value;
    const confirmacaoSenha = document.getElementById('confirmaSenha').value;

    // Simples validação do lado do cliente
    if (!usuario || !senha || !confirmacaoSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verifica se a senha e a confirmação são iguais
    if (senha !== confirmacaoSenha) {
        alert('A senha e a confirmação de senha não correspondem.');
        return;
    }

    const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, senha, confirmacaoSenha }),
    });

    const data = await response.json();
    alert(data.mensagem);
}

async function login() {
    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    // Simples validação do lado do cliente
    if (!usuario || !senha) {
        alert('Por favor, forneça o usuário e a senha.');
        return;
    }

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok) {
        // Login bem-sucedido, redireciona para a página de parabéns
        window.location.href = `/parabens?nome=${usuario}`;
    } else {
        alert(data.mensagem);
    }
}

function alternarFormularios() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');

    // Alterna entre ocultar e exibir os formulários
    cadastroForm.classList.toggle('oculto');
    loginForm.classList.toggle('oculto');
}


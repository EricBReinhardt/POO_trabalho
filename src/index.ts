import promptSync from 'prompt-sync';
import { Livro } from './models/livro';
import { Membro } from './models/membro';
import { Emprestimo } from './models/emprestimo';
import fs from 'fs';

const prompt = promptSync();
const arquivo = 'dados.txt';

// Variáveis para armazenar livros, membros e empréstimos.
let livros: Livro[] = [];
let membros: Membro[] = [];
let emprestimos: Emprestimo[] = [];

// Lê os dados do arquivo JSON e inicializa os arrays, criando instâncias das classes a partir dos dados.
function lerDados() {
    try {
        const dados = fs.readFileSync(arquivo, 'utf-8');
        const parsedData = JSON.parse(dados);

        livros = parsedData.livros.map((livroData: any) => new Livro(livroData.titulo, livroData.autor, livroData.isbn, livroData.ano));
        membros = parsedData.membros.map((membroData: any) => new Membro(membroData.nome, membroData.telefone, membroData.endereco, membroData.matricula));
        emprestimos = parsedData.emprestimos.map((emprestimoData: any) => {
            const livro = livros.find(l => l.getIsbn() === emprestimoData.livro.isbn);
            const membro = membros.find(m => m.getMatricula() === emprestimoData.membro.matricula);
            const dataEmprestimo = new Date(emprestimoData.dataEmprestimo);
            const emprestimo = new Emprestimo(livro!, membro!, dataEmprestimo);
            if (emprestimoData.dataDevolucao) emprestimo.devolver();
            return emprestimo;
        });
    } catch (err) {
        console.log('Erro ao ler o arquivo:', err);
    }
}

// Salva os dados dos arrays no arquivo, convertendo-os para JSON.
function salvarDados() {
    const dados = {
        livros: livros.map(l => ({ titulo: l.getTitulo(), autor: l.getAutor(), isbn: l.getIsbn(), ano: l.getAnoPublicacao() })),
        membros: membros.map(m => ({ nome: m.getNome(), telefone: m.getTelefone(), endereco: m.getEndereco(), matricula: m.getMatricula() })),
        emprestimos: emprestimos.map(e => ({
            livro: { isbn: e.getLivro().getIsbn() },
            membro: { matricula: e.getMembro().getMatricula() },
            dataEmprestimo: e.getDataEmprestimo(),
            dataDevolucao: e.getDataDevolucao()
        }))
    };

    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
    console.log('Dados salvos com sucesso!');
}

// Captura a escolha de uma opção do usuário, retornando o número selecionado.
function opcao(): number {
    return parseInt(prompt("Escolha uma opção: "), 10);
}

// Exibe um menu genérico com um título e uma lista de opções.
function exibirMenu(menu: string, opcoes: string[]): number {
    console.log(`\n=== ${menu} ===`);
    opcoes.forEach((opcao, index) => console.log(`${index + 1} - ${opcao}`));
    return opcao();
}

// Funções para as operações principais de cadastro e manipulação de livros, membros e empréstimos.
function cadastrarLivro() {
    const titulo = prompt("Digite o título do livro: ");
    const autor = prompt("Digite o autor do livro: ");
    const isbn = prompt("Digite o ISBN do livro: ");
    const ano = parseInt(prompt("Digite o ano de publicação do livro: "), 10);
    const livro = new Livro(titulo, autor, isbn, ano);
    Livro.adicionarLivro(livros, livro);
    salvarDados();
    console.log("Livro cadastrado com sucesso!");
}

function cadastrarMembro() {
    const nome = prompt("Digite o nome do membro: ");
    const endereco = prompt("Digite o endereço do membro: ");
    const telefone = prompt("Digite o telefone do membro: ");
    const matricula = prompt("Digite a matrícula do membro: ");
    const membro = new Membro(nome, telefone, endereco, matricula);
    Membro.adicionarMembro(membros, membro);
    salvarDados();
    console.log("Membro cadastrado com sucesso!");
}

function realizarEmprestimo() {
    const isbn = prompt("Digite o ISBN do livro: ");
    const matricula = prompt("Digite a matrícula do membro: ");
    const livro = livros.find(l => l.getIsbn() === isbn);
    const membro = membros.find(m => m.getMatricula() === matricula);

    if (livro && membro) {
        const livroEmprestado = emprestimos.find(e => e.getLivro() === livro && !e.getDataDevolucao());
        
        if (livroEmprestado) {
            console.log("Este livro já está emprestado e não foi devolvido. Não é possível realizar o empréstimo.");
        } else {
            const emprestimo = new Emprestimo(livro, membro, new Date());
            Emprestimo.adicionarEmprestimo(emprestimos, emprestimo);
            salvarDados();
            console.log("Empréstimo realizado com sucesso!");
        }
    } else {
        console.log("Livro ou Membro não encontrado.");
    }
}

// Carrega os dados e inicia o loop principal do programa, onde o usuário pode interagir com os menus.
lerDados();

while (true) {
    const escolha = exibirMenu("Menu Principal", [
        "Menu Livro", "Menu Membro", "Menu Emprestimo", "Sair"
    ]);

    switch (escolha) {
        case 1:
            // Submenu para gerenciar livros.
            while (true) {
                const escolhaLivro = exibirMenu("Menu Livro", [
                    "Cadastrar livro", "Listar livros", "Atualizar livros", "Excluir livro", "Voltar ao menu principal"
                ]);
                if (escolhaLivro === 1) cadastrarLivro();
                else if (escolhaLivro === 2) Livro.listarLivros(livros);
                else if (escolhaLivro === 3) {
                    const isbn = prompt("Digite o ISBN do livro que deseja atualizar: ");
                    const titulo = prompt("Digite o título do livro: ");
                    const autor = prompt("Digite o autor do livro: ");
                    const ano = parseInt(prompt("Digite o ano de publicação do livro: "), 10);
                    const livro = livros.find(l => l.getIsbn() === isbn);
                    if (livro) {
                        livro.atualizar(titulo, autor, ano);
                        salvarDados();
                        console.log("Livro atualizado com sucesso!");
                    } else {
                        console.log("Livro não encontrado.");
                    }
                } else if (escolhaLivro === 4) {
                    const isbn = prompt("Digite o ISBN do livro que deseja excluir: ");
                    Livro.excluirLivro(livros, isbn);
                    salvarDados();
                } else if (escolhaLivro === 5) break;
            }
            break;

        case 2:
            // Submenu para gerenciar membros.
            while (true) {
                const escolhaMembro = exibirMenu("Menu Membro", [
                    "Cadastrar membro", "Listar membros", "Atualizar membro", "Excluir membro", "Voltar ao menu principal"
                ]);
                if (escolhaMembro === 1) cadastrarMembro();
                else if (escolhaMembro === 2) Membro.listarMembros(membros);
                else if (escolhaMembro === 3) {
                    const matricula = prompt("Digite a matrícula do membro que deseja atualizar: ");
                    const nome = prompt("Digite o nome do membro: ");
                    const endereco = prompt("Digite o endereço do membro: ");
                    const telefone = prompt("Digite o telefone do membro: ");
                    const membro = membros.find(m => m.getMatricula() === matricula);
                    if (membro) {
                        membro.atualizar(nome, telefone, endereco);
                        salvarDados();
                        console.log("Membro atualizado com sucesso!");
                    } else {
                        console.log("Membro não encontrado.");
                    }
                } else if (escolhaMembro === 4) {
                    const matricula = prompt("Digite a matrícula do membro que deseja excluir: ");
                    Membro.excluirMembro(membros, matricula);
                    salvarDados();
                } else if (escolhaMembro === 5) break;
            }
            break;

        case 3:
            // Submenu para gerenciar empréstimos.
            while (true) {
                const escolhaEmprestimo = exibirMenu("Menu Emprestimo", [
                    "Realizar empréstimo", "Listar empréstimos", "Devolver livro", "Voltar ao menu principal"
                ]);
                if (escolhaEmprestimo === 1) realizarEmprestimo();
                else if (escolhaEmprestimo === 2) Emprestimo.listarEmprestimos(emprestimos);
                else if (escolhaEmprestimo === 3) {
                    const isbn = prompt("Digite o ISBN do livro que deseja devolver: ");
                    const matricula = prompt("Digite a matrícula do membro: ");
                    const livro = livros.find(l => l.getIsbn() === isbn);
                    const membro = membros.find(m => m.getMatricula() === matricula);
                    const emprestimo = emprestimos.find(e => e.getLivro() === livro && e.getMembro() === membro && !e.getDataDevolucao());
                    if (emprestimo) {
                        emprestimo.devolver();
                        salvarDados();
                        console.log("Livro devolvido com sucesso!");
                    } else {
                        console.log("Empréstimo não encontrado.");
                    }
                } else if (escolhaEmprestimo === 4) break;
            }
            break;

        case 4:
            console.log("Saindo...");
            process.exit(0);

        default:
            console.log("Opção inválida!");
            break;
    }
}

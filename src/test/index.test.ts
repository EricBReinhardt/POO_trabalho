import { Livro } from '../models/livro';
import { Membro } from '../models/membro';
import { Emprestimo } from '../models/emprestimo';

describe('Sistema de Biblioteca', () => {
    let livros: Livro[] = [];
    let membros: Membro[] = [];
    let emprestimos: Emprestimo[] = [];

    beforeEach(() => {
        livros = [];
        membros = [];
        emprestimos = [];
    });

    // Testes da classe Livro
    describe('Livro', () => {
        it('deve adicionar um livro à lista', () => {
            const livro = new Livro('Título', 'Autor', '12345', 2020);
            Livro.adicionarLivro(livros, livro);
            expect(livros.length).toBe(1);
            expect(livros[0].getTitulo()).toBe('Título');
        });

        it('deve listar todos os livros', () => {
            const livro1 = new Livro('Livro 1', 'Autor 1', '111', 2010);
            const livro2 = new Livro('Livro 2', 'Autor 2', '222', 2020);
            Livro.adicionarLivro(livros, livro1);
            Livro.adicionarLivro(livros, livro2);

            console.log = jest.fn();
            Livro.listarLivros(livros);
            expect(console.log).toHaveBeenCalledWith('111 - Livro 1 - Autor 1 - 2010');
            expect(console.log).toHaveBeenCalledWith('222 - Livro 2 - Autor 2 - 2020');
        });

        it('deve excluir um livro pelo ISBN', () => {
            const livro = new Livro('Título', 'Autor', '12345', 2020);
            Livro.adicionarLivro(livros, livro);
            Livro.excluirLivro(livros, '12345');
            expect(livros.length).toBe(0);
        });
    });

    // Testes da classe Membro
    describe('Membro', () => {
        it('deve adicionar um membro à lista', () => {
            const membro = new Membro('João', '123456789', 'Rua A', 'M001');
            Membro.adicionarMembro(membros, membro);
            expect(membros.length).toBe(1);
            expect(membros[0].getNome()).toBe('João');
        });

        it('deve listar todos os membros', () => {
            const membro1 = new Membro('João', '123', 'Rua A', 'M001');
            const membro2 = new Membro('Maria', '456', 'Rua B', 'M002');
            Membro.adicionarMembro(membros, membro1);
            Membro.adicionarMembro(membros, membro2);

            console.log = jest.fn();
            Membro.listarMembros(membros);
            expect(console.log).toHaveBeenCalledWith('M001 - João - 123 - Rua A');
            expect(console.log).toHaveBeenCalledWith('M002 - Maria - 456 - Rua B');
        });

        it('deve excluir um membro pela matrícula', () => {
            const membro = new Membro('João', '123456789', 'Rua A', 'M001');
            Membro.adicionarMembro(membros, membro);
            Membro.excluirMembro(membros, 'M001');
            expect(membros.length).toBe(0);
        });
    });

    // Testes da classe Emprestimo
    describe('Emprestimo', () => {
        it('deve realizar um empréstimo', () => {
            const livro = new Livro('Livro A', 'Autor A', '123', 2020);
            const membro = new Membro('João', '123', 'Rua A', 'M001');
            livros.push(livro);
            membros.push(membro);

            const emprestimo = new Emprestimo(livro, membro, new Date());
            Emprestimo.adicionarEmprestimo(emprestimos, emprestimo);

            expect(emprestimos.length).toBe(1);
            expect(emprestimos[0].getLivro().getTitulo()).toBe('Livro A');
            expect(emprestimos[0].getMembro().getNome()).toBe('João');
        });

        it('deve listar todos os empréstimos', () => {
            const livro = new Livro('Livro A', 'Autor A', '123', 2020);
            const membro = new Membro('João', '123', 'Rua A', 'M001');
            const emprestimo = new Emprestimo(livro, membro, new Date());
            emprestimos.push(emprestimo);

            console.log = jest.fn();
            Emprestimo.listarEmprestimos(emprestimos);
            expect(console.log).toHaveBeenCalled();
        });

        it('deve devolver um livro', () => {
            const livro = new Livro('Livro A', 'Autor A', '123', 2020);
            const membro = new Membro('João', '123', 'Rua A', 'M001');
            const emprestimo = new Emprestimo(livro, membro, new Date());
            emprestimos.push(emprestimo);

            emprestimo.devolver();
            expect(emprestimo.getDataDevolucao()).not.toBeNull();
        });

        it('deve excluir um empréstimo', () => {
            const livro = new Livro('Livro A', 'Autor A', '123', 2020);
            const membro = new Membro('João', '123', 'Rua A', 'M001');
            const emprestimo = new Emprestimo(livro, membro, new Date());
            Emprestimo.adicionarEmprestimo(emprestimos, emprestimo);

            Emprestimo.excluirEmprestimo(emprestimos, livro, membro);
            expect(emprestimos.length).toBe(0);
        });
    });
});

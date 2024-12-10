import { Livro } from './livro';
import { Membro } from './membro';

export class Emprestimo {
    private livro: Livro;
    private membro: Membro;
    private dataEmprestimo: Date;
    private dataDevolucao: Date | null = null;

    constructor(livro: Livro, membro: Membro, dataEmprestimo: Date) {
        this.livro = livro;
        this.membro = membro;
        this.dataEmprestimo = dataEmprestimo;
    }

    public devolver(): void {
        this.dataDevolucao = new Date();
    }

    public getLivro(): Livro {
        return this.livro;
    }

    public getMembro(): Membro {
        return this.membro;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    static adicionarEmprestimo(emprestimos: Emprestimo[], emprestimo: Emprestimo): void {
        emprestimos.push(emprestimo);
    }

    static listarEmprestimos(emprestimos: Emprestimo[]): void {
        emprestimos.forEach(emprestimo => {
            const livro = emprestimo.getLivro();
            const membro = emprestimo.getMembro();
            const dataEmprestimo = emprestimo.getDataEmprestimo();
            const dataDevolucao = emprestimo.getDataDevolucao();

            let devolucaoStr = dataDevolucao ? dataDevolucao.toLocaleDateString() : "Não devolvido";

            console.log(`${livro.getTitulo()} emprestado a ${membro.getNome()}`);
            console.log(`Data de empréstimo: ${dataEmprestimo.toLocaleDateString()}`);
            console.log(`Data de devolução: ${devolucaoStr}\n`);
        });
    }

    static excluirEmprestimo(emprestimos: Emprestimo[], livro: Livro, membro: Membro): void {
        const index = emprestimos.findIndex(e => e.getLivro() === livro && e.getMembro() === membro && !e.getDataDevolucao());
        if (index !== -1) {
            emprestimos.splice(index, 1);
            console.log("Empréstimo excluído com sucesso!");
        } else {
            console.log("Empréstimo não encontrado.");
        }
    }

    public getDataDevolucao(): Date | null {
        return this.dataDevolucao;
    }
}

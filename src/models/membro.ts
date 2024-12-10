import { Pessoa } from './pessoa';

export class Membro extends Pessoa {
    private matricula: string;

    constructor(nome: string, telefone: string, endereco: string, matricula: string) {
        super(nome, telefone, endereco);
        this.matricula = matricula;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    public atualizar(nome: string, endereco: string, telefone: string): void {
        super.atualizar(nome, endereco, telefone);
    }

    static adicionarMembro(membros: Membro[], membro: Membro): void {
        membros.push(membro);
    }

    static listarMembros(membros: Membro[]): void {
        membros.forEach(membro => {
            console.log(`${membro.getMatricula()} - ${membro.getNome()} - ${membro.getTelefone()} - ${membro.getEndereco()}`);
        });
    }

    static excluirMembro(membros: Membro[], matricula: string): void {
        const index = membros.findIndex(m => m.getMatricula() === matricula);
        if (index !== -1) {
            membros.splice(index, 1);
            console.log("Membro excluído com sucesso!");
        } else {
            console.log("Membro não encontrado.");
        }
    }

    public detalhes(): void {
        super.detalhes();
        console.log(`Matrícula: ${this.getMatricula()}`);
    }
}

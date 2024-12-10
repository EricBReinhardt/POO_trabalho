export class Pessoa {
    private nome: string;
    private endereco: string;
    private telefone: string;

    constructor(nome: string, telefone: string, endereco: string) {
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public getNome(): string {
        return this.nome;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public atualizar(nome: string, endereco: string, telefone: string): void {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public detalhes(): void {
        console.log(`Nome: ${this.getNome()}`);
        console.log(`Endereço: ${this.getEndereco()}`);
        console.log(`Telefone: ${this.getTelefone()}`);
    }
}

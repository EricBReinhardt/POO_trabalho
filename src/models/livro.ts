export class Livro {
    private titulo: string;
    private autor: string;
    private ISBN: string;
    private ano: number;

    constructor(titulo: string, autor: string, ISBN: string, ano: number) {
        this.titulo = titulo;
        this.autor = autor;
        this.ISBN = ISBN;
        this.ano = ano;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public getIsbn(): string {
        return this.ISBN;
    }

    public getAnoPublicacao(): number {
        return this.ano;
    }

    public atualizar(titulo: string, autor: string, ano: number): void {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
    static adicionarLivro(livros: Livro[], livro: Livro): void {
        livros.push(livro);
    }

    static listarLivros(livros: Livro[]): void {
        livros.forEach(livro => {
            console.log(`${livro.getIsbn()} - ${livro.getTitulo()} - ${livro.getAutor()} - ${livro.getAnoPublicacao()}`);
        });
    }

    static excluirLivro(livros: Livro[], isbn: string): void {
        const index = livros.findIndex(l => l.getIsbn() === isbn);
        if (index !== -1) {
            livros.splice(index, 1);
            console.log("Livro excluído com sucesso!");
        } else {
            console.log("Livro não encontrado.");
        }
    }
}

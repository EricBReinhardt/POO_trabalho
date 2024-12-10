import { Membro } from "./models/membro";
import { Pessoa } from "./models/pessoa";

const pessoa = new Pessoa("João", "123456", "Rua 1");
pessoa.detalhes();
const membro = new Membro("Maria", "654321", "Rua 2", "123");
membro.detalhes();
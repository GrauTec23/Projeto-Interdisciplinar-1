class Pessoa {
    constructor(sexo, idade, peso, altura, fatorAtividade) {
        // Inicialização das propriedades da pessoa
        this.sexo = sexo;
        this.idade = idade;
        this.peso = peso;
        this.altura = altura;
        this.fatorAtividade = fatorAtividade;
    }

    // Método para calcular a taxa metabólica
    calcularTaxaMetabolica(meta) {
        let taxaMetabolica; 

        // Cálculo da taxa metabólica com base no sexo da pessoa
        if (this.sexo === "masculino") {
            taxaMetabolica = (66 + (13.7 * this.peso) + (5 * this.altura) - (6.8 * this.idade)) * this.fatorAtividade;
        } else {
            taxaMetabolica = (655 + (9.6 * this.peso) + (1.8 * this.altura) - (4.7 * this.idade)) * this.fatorAtividade;
        }

        // Cálculo da sugestão de dieta com base na meta
        let sugestaoDieta = taxaMetabolica;
        if (meta === "ganharMassa") {
            sugestaoDieta += 500; // Adiciona 500 calorias para ganhar massa
        } else if (meta === "perderGordura") {
            sugestaoDieta -= 500; // Subtrai 500 calorias para perder gordura
        }

        // Retorno dos resultados formatados
        return {
            taxaMetabolica: taxaMetabolica.toFixed(2), // Formata a taxa metabólica com 2 casas decimais
            sugestaoDieta: sugestaoDieta.toFixed(2) 
        };
    }
}

// Função para calcular a taxa metabólica com base nos dados do formulário HTML
function calcularTaxaMetabolica() {
    // Obtenção dos valores dos elementos do formulário
    const sexo = document.getElementById("sexo").value;
    const idade = parseInt(document.getElementById("idade").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const nivelAtividade = document.getElementById("nivelAtividade").value;
    let fatorAtividade;

    // Determinação do fator de atividade com base no nível de atividade selecionado
    switch (nivelAtividade) { // Estrutura de controle que compara valores de variáveis
        case "sedentario":
            fatorAtividade = 1.2;
            break;
        case "leve":
            fatorAtividade = 1.375;
            break;
        case "moderado":
            fatorAtividade = 1.55;
            break;
        case "ativo":
            fatorAtividade = 1.725;
            break;
        default: // Determina um valor padrão
            fatorAtividade = 1.55; 
            break;
    }

    // Obtenção da meta selecionada pelo usuário
    const meta = document.getElementById("meta").value;

    // Criação de um objeto Pessoa com os dados fornecidos e cálculo da taxa metabólica
    const pessoa = new Pessoa(sexo, idade, peso, altura, fatorAtividade);
    const resultado = pessoa.calcularTaxaMetabolica(meta);

    // Atualização do elemento HTML com o resultado do cálculo
    document.getElementById("resultado").innerHTML = `
        Sua taxa metabólica basal somada ao nível de atividade física é: ${resultado.taxaMetabolica} calorias por dia. <br>
        Sugestão de dieta para ${meta === "ganharMassa" ? "ganhar massa" : "perder gordura"}: ${resultado.sugestaoDieta} calorias por dia.
    `; // (condição ? expressão_se_verdadeira : expressão_se_falsa)
}
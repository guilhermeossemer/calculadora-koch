function mostrarFormulario(opcao) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("formulario1").style.display = opcao === 1 ? "block" : "none";
    document.getElementById("formulario2").style.display = opcao === 2 ? "block" : "none";
    document.getElementById("formulario3").style.display = opcao === 3 ? "block" : "none";
    document.getElementById("formulario4").style.display = opcao === 4 ? "block" : "none";
}

function voltarMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("formulario1").style.display = "none";
    document.getElementById("formulario2").style.display = "none";
    document.getElementById("formulario3").style.display = "none";
    document.getElementById("formulario4").style.display = "none";
}

function calcularTaraPapelao() {
    const taraEmbalagem = parseFloat(document.getElementById("taraEmbalagem").value);
    const qtdPeca = parseFloat(document.getElementById("qtdPeca").value);
    const qtdcaixa = parseFloat(document.getElementById("qtdcaixaa").value);
    const taraCaixa = parseFloat(document.getElementById("taraCaixa").value);
    const pesoBalanca = parseFloat(document.getElementById("pesoBalanca").value);

    const resultado = (((taraEmbalagem / 1000) * qtdPeca) + (qtdcaixa * taraCaixa) - pesoBalanca) * -1;

    if (isNaN(taraEmbalagem) || isNaN(qtdPeca) || isNaN(pesoBalanca) || isNaN(qtdcaixa) || isNaN(taraCaixa)) {
        document.getElementById("resultado").innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    document.getElementById("resultado").innerText = resultado.toFixed(3);
}

function calcularTara() {
    const tara = parseFloat(document.getElementById("tara").value);
    const qtdPeca = parseFloat(document.getElementById("qtdPeca2").value);
    const pesoBalanca = parseFloat(document.getElementById("pesoBalanca2").value);

    const resultado = (((tara / 1000) * qtdPeca) - pesoBalanca) * -1;

    if (isNaN(tara) || isNaN(qtdPeca) || isNaN(pesoBalanca)) {
        document.getElementById("resultado2").innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    document.getElementById("resultado2").innerText = resultado.toFixed(3);
}

function calcularSaida() {
    // Pega os valores do input
    const entrada = document.getElementById("entrada").value;
    const saidaAlmoco = document.getElementById("saidaAlmoco").value;
    const voltaAlmoco = document.getElementById("voltaAlmoco").value;
    const horasTrabalho = document.getElementById("horasTrabalho").value;

    if (!entrada || !saidaAlmoco || !voltaAlmoco || !horasTrabalho) {
        document.getElementById("resultado3").textContent = "Por favor, preencha todos os campos.";
        return;
    }

    // Converte os horários para minutos
    const [entradaHoras, entradaMinutos] = entrada.split(":").map(Number);
    const [saidaAlmocoHoras, saidaAlmocoMinutos] = saidaAlmoco.split(":").map(Number);
    const [voltaAlmocoHoras, voltaAlmocoMinutos] = voltaAlmoco.split(":").map(Number);
    const [horasTrabalhoHoras, horasTrabalhoMinutos] = horasTrabalho.split(":").map(Number);

    const entradaTotalMinutos = entradaHoras * 60 + entradaMinutos;
    const saidaAlmocoTotalMinutos = saidaAlmocoHoras * 60 + saidaAlmocoMinutos;
    const voltaAlmocoTotalMinutos = voltaAlmocoHoras * 60 + voltaAlmocoMinutos;
    const horasTrabalhoTotalMinutos = horasTrabalhoHoras * 60 + horasTrabalhoMinutos;

    // Calcula o tempo trabalhado antes do almoço
    const trabalhoAntesAlmoco = saidaAlmocoTotalMinutos - entradaTotalMinutos;

    // Calcula o tempo restante de trabalho após o almoço
    const tempoRestanteTrabalho = horasTrabalhoTotalMinutos - trabalhoAntesAlmoco;

    // Calcula o horário de saída
    const horarioSaidaTotalMinutos = voltaAlmocoTotalMinutos + tempoRestanteTrabalho;
    const horarioSaidaHoras = Math.floor(horarioSaidaTotalMinutos / 60);
    const horarioSaidaMinutos = horarioSaidaTotalMinutos % 60;

    // Formata o horário de saída
    const horarioSaida = `${String(horarioSaidaHoras).padStart(2, '0')}:${String(horarioSaidaMinutos).padStart(2, '0')}`;

    document.getElementById("resultado3").textContent = "Horário de Saída: " + horarioSaida;

    // Calcula o tempo trabalhado
}
function calcularShelfLife() {
    const fabricacao = new Date(document.getElementById("fabricacao").value);
    const validade = new Date(document.getElementById("validade").value);

    if (isNaN(fabricacao) || isNaN(validade)) {
        document.getElementById("resultado4").innerText = "Por favor, insira datas válidas.";
        return;
    }

    const diferenca = (validade - fabricacao) / (1000 * 60 * 60 * 24); // Diferença em dias
    const shelfLife = Math.floor(diferenca * 0.33); // 70% do tempo total
    const dataLimite = new Date(fabricacao);
    dataLimite.setDate(fabricacao.getDate() + shelfLife);

    document.getElementById("resultado4").innerText = `Bom para receber até: ${dataLimite.toLocaleDateString("pt-BR")}`;
}

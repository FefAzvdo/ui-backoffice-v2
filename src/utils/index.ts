import { createElement, FunctionComponent, SVGProps, ReactNode } from "react";
import { mockStatusPedido } from "../pages/mock";

// Regex para validação de string no formato CNPJ
export const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;

// Método de validação
// Referência: https://pt.wikipedia.org/wiki/Cadastro_Nacional_da_Pessoa_Jur%C3%ADdica
export function isCnpjValid(value: string | number | number[] = "") {
  if (!value) return false;

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof value === "string";
  const validTypes =
    isString || Number.isInteger(value) || Array.isArray(value);

  // Elimina valor de tipo inválido
  if (!validTypes) return false;

  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value);
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = regexCNPJ.test(value);
    // Verifica se o valor passou em ao menos 1 dos testes
    const isValid = digitsOnly || validFormat;

    // Se o formato não é válido, retorna inválido
    if (!isValid) return false;
  }

  // Elimina tudo que não é dígito
  const numbers = matchNumbers(value);

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false;

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  // Separa os 2 últimos dígitos verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const digit0 = validCalc(12, numbers);
  if (digit0 !== digits[0]) return false;

  // Valida 2o. dígito verificador
  const digit1 = validCalc(13, numbers);
  return digit1 === digits[1];
}

// Método de formatação
export function formatCNPJ(value: string | number | number[] = "") {
  // Verifica se o valor é válido
  const valid = isCnpjValid(value);

  // Se o valor não for válido, retorna vazio
  if (!valid) return "";

  // Elimina tudo que não é dígito
  const numbers = matchNumbers(value);
  const text = numbers.join("");

  // Formatação do CNPJ: 99.999.999/9999-99
  const format = text.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );

  // Retorna o valor formatado
  return format;
}

// Cálculo validador
function validCalc(x: number, numbers: number[]) {
  const slice = numbers.slice(0, x);
  let factor = x - 7;
  let sum = 0;

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i];
    sum += n * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);

  return result > 9 ? 0 : result;
}

// Elimina tudo que não é dígito
function matchNumbers(value: string | number | number[] = "") {
  const match = value.toString().match(/\d/g);
  return Array.isArray(match) ? match.map(Number) : [];
}

export function isEmailValid(email: string) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
}

export function hasNumber(text: string): boolean {
  return !!text.match(/(?=.*[0-9])/g);
}
export function hasLowerCase(text: string) {
  return !!text.match(/(?=.*[a-z])/g);
}
export function hasUpperCase(text: string) {
  return !!text.match(/(?=.*[A-Z])/g);
}
export function hasSpecialChar(text: string) {
  return !!text.match(/(?=.*[ç~^;/\\!@#$%¨&*()])/g);
}

export function onlyNumbers(text: string) {
  return text.replace(/\D/g, "");
}

export function formatCurrencyFloatToBRLString(
  numero: number | string | undefined
): string {
  if (numero === undefined) return "";
  return numero.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function formatarValorInputParaMoedaBRL(valor: string): string {
  // Remove caracteres não numéricos
  const valorNumerico = parseFloat(valor.replace(/[^\d]/g, ""));

  // Converte para centavos
  const valorCentavos = valorNumerico / 100;

  // Formata como moeda brasileira
  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Retorna o valor formatado
  return formatoMoeda.format(valorCentavos);
}

export function formatarTelefone(telefone: string): string {
  const numeros = telefone.replace(/\D/g, "");

  const ehCelular = numeros.length === 11;

  if (ehCelular) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  } else {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(
      6
    )}`;
  }
}

export function formatarCPF(cpf: string): string {
  const numeros = cpf.replace(/\D/g, "");

  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
    6,
    9
  )}-${numeros.slice(9)}`;
}

export function isCpfValid(cpf: string): boolean {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function isCurrentDateAfterGivenDate(givenDate: string): boolean {
  // Obtém a data atual
  const currentDate = new Date();

  // Divide a data fornecida em dia, mês e ano
  const parts = givenDate.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Os meses em JavaScript são indexados de 0 a 11
  const year = parseInt(parts[2], 10);

  // Converte a data fornecida para o objeto Date
  const providedDate = new Date(year, month, day);

  // Compara as datas
  return currentDate > providedDate;
}

export function isDateDD_MM_YYYY_Valid(input: string): boolean {
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  return !!input?.match(reg) && isCurrentDateAfterGivenDate(input);
}

export function formatDateFromYYYY_MM_DD_To_DD_MM_YYYY(
  data: string | undefined
): string {
  if (data === undefined) return "";
  try {
    const firstPart = data.split("T")[0];

    const partes = firstPart.split("-");

    if (partes.length !== 3) {
      // throw new Error("Formato de data inválido");
      return "";
    }

    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    return dataFormatada;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "";
  }
}

export function formatDateFromDD_MM_YYYY_To_YYYY_MM_DD(data: string): string {
  const partes: string[] = data.split("/");

  if (partes.length !== 3) {
    return "";
  }

  const dataObj: Date = new Date(
    parseInt(partes[2], 10),
    parseInt(partes[1], 10) - 1,
    parseInt(partes[0], 10)
  );

  const dataFormatada: string = dataObj.toISOString().slice(0, 10);

  return dataFormatada;
}

export function setMaskNumeroCelular(numero: string): string {
  // Remover caracteres não numéricos do número
  const numeroLimpo = numero.replace(/\D/g, "");

  // Verificar se o número tem 11 dígitos (incluindo o DDD)
  if (numeroLimpo.length === 11) {
    // Formatar o número de celular
    const numeroFormatado = `(${numeroLimpo.substring(
      0,
      2
    )}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
    return numeroFormatado;
  } else {
    // Caso o número não tenha 11 dígitos, retornar o número original
    return numero;
  }
}

// export function setMaskDataNascimento(v : string) {
//   v = v.replace(/\D/g, "");
//   v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
//   v = v.replace(/(\d)(\d{4})$/, "$1-$2");
//   return v;
// }

export function setMaskDataNascimento(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export function formatPhoneNumber(phoneNumber: string) {
  const ddd = phoneNumber.slice(0, 2);
  const numberWithoutDDD = phoneNumber.slice(2);

  let formattedNumber;

  if (numberWithoutDDD.length === 9) {
    // Formatação para celular: "(XX) XXXXX-XXXX"
    formattedNumber = `${numberWithoutDDD.slice(0, 5)}-${numberWithoutDDD.slice(
      5
    )}`;
  } else if (numberWithoutDDD.length === 8) {
    // Formatação para telefone fixo: "(XX) XXXX-XXXX"
    formattedNumber = `${numberWithoutDDD.slice(0, 4)}-${numberWithoutDDD.slice(
      4
    )}`;
  } else {
    throw new Error("Número de telefone inválido.");
  }

  return `(${ddd}) ${formattedNumber}`;
}

export function formatCurrencyBrlToFloat(numero: string): number {
  //890.450.555,45

  const reais = onlyNumbers(numero.split(",")[0]); //890450555
  const centavos = numero.split(",")[1]; //45

  return Number.parseFloat(reais + "." + centavos);
}

export function convertPhosphorIcon(
  icon: ReactNode
): FunctionComponent<SVGProps<SVGSVGElement>> {
  return (props: SVGProps<SVGSVGElement>) => createElement("div", props, icon);
}

export function getCurrentStatusPedido(status: string | undefined):
  | {
      label: string;
      value: string;
      color: string;
    }
  | undefined {
  if (mockStatusPedido.find((stat) => stat.value === status) === undefined) {
    return {
      label: "",
      value: "",
      color: "",
    };
  }
  return mockStatusPedido.find((stat) => stat.value === status);
}

export function getIdTipoItemPedido(tipo: string): number {
  switch (tipo) {
    case "recarga-na-conta":
      return 13;
    case "cartao-com-recarga":
      return 3;
    default:
      return 0;
  }
}

export function getIdAplicacao(tipo: string): number {
  switch (tipo) {
    case "recarga-na-conta":
      return 30;
    case "cartao-com-recarga":
      return 10;
    default:
      return 0;
  }
}

export function getIdProduto(tipo: string): number {
  switch (tipo) {
    case "recarga-na-conta":
      return 2;
    case "cartao-com-recarga":
      return 6;
    default:
      return 0;
  }
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isLocalhost() {
  return Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
}

export const downloadBlob = (filename: string, blob: Blob) => {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(new Blob([blob]));
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formata um CPF no padrão 000.000.000-00
 */
export function formatCPF(cpf: string): string {
  if (!cpf) return "";
  // Remove caracteres não numéricos
  const cpfClean = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cpfClean.length !== 11) return cpf;

  // Formata no padrão 000.000.000-00
  return cpfClean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Formata um telefone no padrão (00) 00000-0000 ou (00) 0000-0000
 */
export function formatPhone(phone: string): string {
  if (!phone) return "";
  // Remove caracteres não numéricos
  const phoneClean = phone.replace(/\D/g, "");

  // Verifica se é celular (11 dígitos) ou fixo (10 dígitos)
  if (phoneClean.length === 11) {
    return phoneClean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (phoneClean.length === 10) {
    return phoneClean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}

/**
 * Formata um CEP no padrão 00000-000
 */
export function formatZipCode(zipCode: string): string {
  if (!zipCode) return "";
  // Remove caracteres não numéricos
  const zipCodeClean = zipCode.replace(/\D/g, "");

  // Verifica se tem 8 dígitos
  if (zipCodeClean.length !== 8) return zipCode;

  // Formata no padrão 00000-000
  return zipCodeClean.replace(/(\d{5})(\d{3})/, "$1-$2");
}

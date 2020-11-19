export function cpfMask(cpf: string): string {
  let mask = '';

  if (cpf.length === 11) {
    mask = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cpf.length === 14) {
    mask = cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  } else {
    mask = cpf;
  }

  return mask;
}

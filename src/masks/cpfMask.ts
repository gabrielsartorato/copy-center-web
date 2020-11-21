export function cpfMask(cpf: string): string {
  let mask = '';
  const cpfWithOutformat = cpf.replace(/[^\d]+/g, '');

  if (cpf.length <= 11) {
    mask = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  if (cpf.length > 11) {
    mask = cpfWithOutformat.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  } else {
    mask;
  }

  return mask;
}

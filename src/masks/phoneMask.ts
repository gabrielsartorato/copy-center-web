export function phoneMask(phone: string): string {
  let mask = '';
  const phoneWithOutformat = phone.replace(/[^\d]+/g, '');

  if (phone.length === 10) {
    mask = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (phone.length >= 11) {
    mask = phoneWithOutformat.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    mask = phone;
  }

  return mask;
}

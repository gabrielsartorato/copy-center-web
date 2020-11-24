const formatValue = (value: any): string => {
  const v = `${(value.replace(/\D/g, '') / 100).toFixed(2)}`.split('.');

  const m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);

  for (let i = 0; i < m!.length; i++)
    m![i] = `${m![i].split('').reverse().join('')}.`;

  const r = m!.reverse().join('');

  return `R$ ${r.substring(0, r.lastIndexOf('.'))},${v[1]}`;
};

export default formatValue;

export const floatFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const intFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const pctFormatter = (string) => {
  return Number(string).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})

}

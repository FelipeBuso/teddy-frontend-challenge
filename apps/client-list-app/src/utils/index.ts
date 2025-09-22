export const currencyFormater = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const normalizeNumberValue = (value: string) => {
  const onlyNumbers = value.replace(/[^0-9,]/g, "");
  const formatedvalue = onlyNumbers.replace(/,/g, ".");
  return Number(formatedvalue);
};

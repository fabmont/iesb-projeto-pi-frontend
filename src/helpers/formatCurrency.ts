export default function formatCurrency(number: number) {
  return `R$ ${Intl.NumberFormat('pt-BR').format(number)}`;
}

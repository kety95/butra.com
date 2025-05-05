// Converte 'YYYY-MM-DD' ou 'YYYY-MM-DD' para 'DD/MM/AA'
export const formatDateToDisplay = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.includes('/')
    ? dateString.split('/')
    : dateString.split('-');

  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};

// Converte 'YYYY/MM/DD' para 'YYYY-MM-DD'
export function toApiDate(dateStr) {
  if (dateStr.includes('-')) return dateStr;
  const [year, month, day] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Converte 'YYYY-MM-DD' para 'DD de mês por extenso de YYYY'
export function formatFullDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${day} de ${meses[parseInt(month, 10) - 1]} de ${year}`;
  }
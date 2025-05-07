import { getFormatedDate } from 'react-native-modern-datepicker';

export const minimunDate = () => {
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');
  return startDate;
}

// Converte 'YYYY-MM-DD' para 'DD/MM/AA'
export const formatDateToDisplay = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.includes('/')
    ? dateString.split('/')
    : dateString.split('-');
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};

// Converte 'DD/MM/YYYY', ou 'YYYY/MM/DD' para 'YYYY-MM-DD'
export function toApiDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return dateStr;

  const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  let year, month, day;

  if (parts[0].length === 4) {
    [year, month, day] = parts;
  } else {
    [day, month, year] = parts;
  }

  const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  return formatted;
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
// Converte 'YYYY-MM-DD' para 'DD/MM/AA'
export function formatDateToDisplay(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  }
  
// Converte 'DD/MM/AA' para 'YYYY-MM-DD'
export function toApiDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month}-${day}`;
  }
  
// Converte 'YYYY-MM-DD' para 'DD de mês por extenso de YYYY'
// Ex: '2025-04-15' => '15 de abril de 2025'
export function formatFullDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${day} de ${meses[parseInt(month, 10) - 1]} de ${year}`;
  }
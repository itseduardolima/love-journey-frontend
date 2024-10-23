export function formatDate(dateString: string): string {
  const months: string[] = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const date: Date = new Date(dateString);

  const day: number = date.getUTCDate();
  const month: string = months[date.getUTCMonth()];
  const year: number = date.getUTCFullYear();

  return `${day} de ${month} de ${year}`;
}

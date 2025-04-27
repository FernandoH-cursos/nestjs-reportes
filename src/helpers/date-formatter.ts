export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  static getDDMMMMYYYY(date: Date = new Date()): string {
    return this.formatter.format(date);
  }
}

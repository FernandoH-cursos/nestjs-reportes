export class CurrencyFormatter {
  static format(value: number): string {
    if (value === null || value === undefined) return '';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}

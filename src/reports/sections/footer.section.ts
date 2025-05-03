import type { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  console.log(pageSize);
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: 'right',
    fontSize: 12,
    margin: [0, 20, 40, 0],
    bold: true,
  };
};

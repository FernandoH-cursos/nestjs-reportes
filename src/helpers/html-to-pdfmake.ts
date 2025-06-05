import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  //* Permite reemplazar los valores de las llaves {{key}} en el HTML
  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{${key}}}`;
    const key2 = `{{ ${key} }}`;
    html = html.replaceAll(key1, value).replaceAll(key2, value);
  });

  //* Convierte el HTML a PDFMake utilizando JSDOM para manejar el DOM en Node.js
  const { window } = new JSDOM(html);
  //* htmlToPdfmake convierte el HTML a un formato que PDFMake puede entender
  return htmlToPdfmake(html, { window });
};

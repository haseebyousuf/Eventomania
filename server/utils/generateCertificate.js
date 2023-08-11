import fs from "fs/promises";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateCertificate(name, eventName, date) {
  const pdfPath = "./utils/certificate.pdf";
  const existingPdfBytes = await fs.readFile(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const TimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const TimesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const nameWidth = TimesRoman.widthOfTextAtSize(name.toUpperCase(), 30);
  const nameHeight = 30;

  const xName = (width - nameWidth) / 2;
  const yName = (height - nameHeight) / 2;
  firstPage.drawText(name.toUpperCase(), {
    x: xName,
    y: yName - 75,
    size: 30,
    font: TimesRoman,
    color: rgb(0.019, 0.17, 0.43),
  });

  const eventNameWidth = TimesRomanBold.widthOfTextAtSize(eventName, 20);
  const eventNameHeight = 20;

  const xEvent = (width - eventNameWidth) / 2;
  const yEvent = (height - eventNameHeight) / 2;

  firstPage.drawText(eventName, {
    x: xEvent,
    y: yEvent - 148,
    size: 20,
    font: TimesRomanBold,
    color: rgb(0.019, 0.17, 0.43),
  });

  const dateHeight = 17;

  const yDate = (height - dateHeight) / 2;

  firstPage.drawText(`${date}.`, {
    x: 375.4 + 169,
    y: yDate - 183,
    size: 17,
    font: TimesRomanBold,
    color: rgb(0.019, 0.17, 0.43),
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
  // Save the modified PDF
  // const outputPath = "./utils/modified.pdf";
  // await fs.writeFile(outputPath, pdfBytes);
}

// generateCertificate2("HASEEB YOUSUF", "NAAC Visit", "3rd May 2023").catch(
//   (error) => {
//     console.error("Error modifying PDF:", error);
//   }
// );

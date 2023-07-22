import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateCertificate(name, eventName) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    // Helper to move to next line
    function jumpLine(lines) {
      for (let index = 0; index < lines; index++) {
        doc.moveDown();
      }
    }
    const buffers = [];

    doc.on("data", (buffer) => buffers.push(buffer));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc
      .fillAndStroke("#0e8cc3")
      .lineWidth(20)
      .lineJoin("round")
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    const logoImagePath = path.join(__dirname, "./logo.png");

    doc.image(logoImagePath, doc.page.width / 2 - maxWidth / 2, 60, {
      fit: [maxWidth, maxHeight],
      align: "center",
    });

    jumpLine(6);
    const font1Path = path.join(__dirname, "./fonts/NotoSansJP-Light.otf");

    doc
      .font(font1Path)
      .fontSize(16)
      .fill("#021c27")
      .text("Sri Pratap College Srinagar", {
        align: "center",
      });

    jumpLine(2);

    // Content
    const font2Path = path.join(__dirname, "./fonts/NotoSansJP-Regular.otf");

    doc
      .font(font2Path)
      .fontSize(20)
      .fill("#021c27")
      .text("CERTIFICATE OF PARTICIPATION", {
        align: "center",
      });

    jumpLine(1);

    doc.font(font1Path).fontSize(14).fill("#021c27").text("Present to", {
      align: "center",
    });

    jumpLine(1);
    const boldPath = path.join(__dirname, "./fonts/NotoSansJP-Bold.otf");

    doc.font(boldPath).fontSize(30).fill("#021c27").text(name.toUpperCase(), {
      align: "center",
    });

    jumpLine(1);

    doc
      .font(font1Path)
      .fontSize(16)
      .fill("#021c27")
      .text(`for successfully attending the ${eventName}.`, {
        align: "center",
      });

    // jumpLine(7);

    // doc.lineWidth(1);

    // Signatures
    // const lineSize = 174;
    // const signatureHeight = 390;

    // doc.fillAndStroke("#021c27");
    // doc.strokeOpacity(0.2);

    // const startLine1 = 128;
    // const endLine1 = 128 + lineSize;
    // doc
    //   .moveTo(startLine1, signatureHeight)
    //   .lineTo(endLine1, signatureHeight)
    //   .stroke();

    // const startLine2 = endLine1 + 32;
    // const endLine2 = startLine2 + lineSize;
    // doc
    //   .moveTo(startLine2, signatureHeight)
    //   .lineTo(endLine2, signatureHeight)
    //   .stroke();

    // const startLine3 = endLine2 + 32;
    // const endLine3 = startLine3 + lineSize;
    // doc
    //   .moveTo(startLine3, signatureHeight)
    //   .lineTo(endLine3, signatureHeight)
    //   .stroke();

    // doc
    //   .font("fonts/NotoSansJP-Bold.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("John Doe", startLine1, signatureHeight + 10, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // doc
    //   .font("fonts/NotoSansJP-Light.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("Associate Professor", startLine1, signatureHeight + 25, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // doc
    //   .font("fonts/NotoSansJP-Bold.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("Student Name", startLine2, signatureHeight + 10, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // doc
    //   .font("fonts/NotoSansJP-Light.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("Student", startLine2, signatureHeight + 25, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // doc
    //   .font("fonts/NotoSansJP-Bold.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("Jane Doe", startLine3, signatureHeight + 10, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // doc
    //   .font("fonts/NotoSansJP-Light.otf")
    //   .fontSize(10)
    //   .fill("#021c27")
    //   .text("Director", startLine3, signatureHeight + 25, {
    //     columns: 1,
    //     columnGap: 0,
    //     height: 40,
    //     width: lineSize,
    //     align: "center",
    //   });

    // jumpLine(4);

    // Footer
    // const bottomHeight = doc.page.height - 100;

    // doc.image("assets/qr.png", doc.page.width / 2 - 30, bottomHeight, {
    //   fit: [60, 60],
    // });

    doc.end();
  });
}

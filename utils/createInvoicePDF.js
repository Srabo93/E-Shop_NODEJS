const fs = require("fs");
const filePath = require("path");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path, res) {
  let doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateTableHeader(doc);
  generateInvoiceTable(doc, invoice);
  generateTotalStats(doc, invoice);
  generateFooter(doc);

  doc.pipe(fs.createWriteStream(path));
  doc.end();
}

function generateHeader(doc) {
  const image = filePath.join("public", "img", "shopping-cart.png");
  doc
    .image(image, 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("E-Shop Express", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      700,
      { align: "center", width: 500 }
    );
}
function generateTableHeader(doc) {
  doc
    .fontSize(12)
    .text("Products", 50, 320)
    .text("Description", 150, 320)
    .text("Quantity", 280, 320, { width: 90, align: "right" })
    .text("Amount", 370, 320, { width: 90, align: "right" })
    .text("Subtotal", 400, 320, { align: "right" });
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c5, 0, y, { align: "right" });
}

function generateInvoiceTable(doc, invoice) {
  let i,
    invoiceTableTop = 330;
  const [order] = invoice;
  const { dataValues } = order;
  const { products } = dataValues;

  for (i = 0; i < products.length; i++) {
    const item = products[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.title,
      item.description.substring(0, 30) + "...",
      item.orderItem.dataValues.quantity,
      item.price + "$",
      item.orderItem.dataValues.quantity * item.price + "$"
    );
  }
}

function generateCustomerInformation(doc, invoice) {
  const [order] = invoice;
  doc
    .text(`Invoice Number: ${order.id}`, 50, 200)
    .text(
      `Invoice Date: ${order.createdAt.toLocaleDateString("en-US")}`,
      50,
      215
    )

    .text("John Doe", 450, 200)
    .text(`Shipping.city`, 450, 215)
    .text(`Shipping.state`, 450, 230)
    .text(`Shipping.country`, 450, 245)
    .moveDown();
}

function generateTotalStats(doc, invoice) {
  const [order] = invoice;
  let VAT = (order.dataValues.total / 100) * 19;
  doc
    .fontSize(12)
    .text("inc. VAT", 370, 450, {
      width: 90,
      align: "right",
      underline: true,
    })
    .text(`${VAT.toFixed(2)}$`, 510, 450)
    .fontSize(15)
    .text("Total", 370, 500, {
      width: 90,
      align: "right",
      bold: true,
    })
    .text(`${order.dataValues.total}$`, 490, 500);
}
module.exports = {
  createInvoice,
};

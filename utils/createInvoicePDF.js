const fs = require("fs");
const filePath = require("path");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path, res) {
  let doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.pipe(fs.createWriteStream(path));
  doc.end();
}

function generateHeader(doc) {
  //   const image = filePath.join("/", "public", "img", "shopping-cart.png");
  // .image(image, 50, 45, { width: 50 })
  doc
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
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right" })
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
      item.description.substring(0, 40) + "...",
      item.orderItem.dataValues.quantity + "X",
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

    .text("John Doe", 300, 200)
    .text("shipping.address", 300, 215)
    .text(`shipping.city, shipping.state, shipping.country`, 300, 130)
    .moveDown();
}
module.exports = {
  createInvoice,
};

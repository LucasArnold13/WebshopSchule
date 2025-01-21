const fs = require("fs");
const path = require("path");


async function storeImage(image) {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Bestimme den Dateityp aus dem Base64-Header
    const mimeType = image.match(/^data:image\/(\w+);base64,/)[1];
    const extension = mimeType === "jpeg" ? "jpg" : mimeType;

    // Erstelle einen eindeutigen Dateinamen
    const fileName = `${Date.now()}.${extension}`;
    const filePath = path.join(__dirname, "..", "images", fileName);
    fs.writeFileSync(filePath, buffer);

    return fileName;
}


module.exports = { storeImage };
import { PDFDocument, PDFForm } from 'pdf-lib';

async function getExistingBytes(templateName: string): Promise<ArrayBuffer> {
    const url = require(`src/assets/pdf/${templateName}.pdf`);
    return await fetch(url).then((res) => res.arrayBuffer());
}

function editFields(form: PDFForm, data: any): void {
    // TODO
}

async function triggerDownload(targetDoc: PDFDocument): Promise<void> {
    // Save the copy
    const pdfBytes = await targetDoc.save();
    
    // Convert to a blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf'});
    
    // Create an URL
    const objectURL = window.URL.createObjectURL(blob);
    
    // Download the file
    (document.getElementById('exportBtn') as HTMLLinkElement).href = objectURL;
    document.getElementById('exportBtn').click();
}

export default async function exportResume(templateName: string, data: any): Promise<void> {
    // Fetch bytes
    const existingBytes = await getExistingBytes(templateName);
    
    // Load the original document
    const srcDoc = await PDFDocument.load(existingBytes);
    
    // Edit
    editFields(srcDoc.getForm(), data);
    
    // Download the file
    await triggerDownload(srcDoc);
}
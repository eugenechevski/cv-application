import { PDFDocument, PDFForm } from 'pdf-lib';
import getDateFromString from './getDateFromString';
import numToMonthName from './numToMonthName';

async function getExistingBytes(templateName: string): Promise<ArrayBuffer> {
    const url = require(`src/assets/pdf/${templateName}.pdf`);
    return await fetch(url).then((res) => res.arrayBuffer());
}

function getFormattedDateStrings(dateFrom: Date, dateTo: Date): string[] {
    const dateFromStrFormatted = `${numToMonthName[dateFrom.getMonth()].toUpperCase()} ${dateFrom.getFullYear()}`;
    const dateToStrFormatted = `${dateTo === undefined ? '' : numToMonthName[dateTo.getMonth()].toUpperCase()} ${dateTo.getFullYear()}`;

    return [dateFromStrFormatted, dateToStrFormatted];
}

function editFields(form: PDFForm, data: BasicResume | ExtendedResume, templateName: string): void {
    form.getTextField('name').setText(data.name)
    form.getTextField('title').setText(data.title);
    form.getTextField('info').setText([data.street, data.city, data.zip, data.phone, data.email].join('\n'));
    form.getTextField('skills').setText(data.skills.join('\n'));
    form.getTextField('awards').setText(data.awards.join('\n'));
    
    // Draw experience
    for (let i = 0; i < data.experience.length; i += 1) {
        form.getTextField(`experience.${i}.0`).setText(`${data.experience[i].companyName}, ${data.experience[i].location} - ${data.experience[i].jobTitle}`);
        const [dateFromStr, dateToStr] = getFormattedDateStrings(getDateFromString(data.experience[i].dateFrom), getDateFromString(data.experience[i].dateTo));
        form.getTextField(`experience.${i}.1`).setText(`${dateFromStr} - ${dateToStr}`);
        form.getTextField(`experience.${i}.2`).setText(`${data.experience[i].description}`);
    }

    // Erase any not used text
    if (data.experience.length < 3) {
        for (let i = 0; i < 3 - data.experience.length; i += 1) {
            form.getTextField(`experience.${2 - i}.0`).setText(' ');
            form.getTextField(`experience.${2 - i}.1`).setText(' ');
            form.getTextField(`experience.${2 - i}.2`).setText(' ');
        }
    }
    
    // Draw education
    const maxEducationLength = templateName === 'Professional' ? 1 : templateName === 'Simple' ? 2 : 3;
    const educationLength = Math.min(maxEducationLength, data.education.length);
    for (let i = 0; i < educationLength; i += 1) {
        form.getTextField(`education.${i}.0`).setText(`${data.education[i].schoolName}, ${data.education[i].location} - ${data.education[i].degree}`);

        const [dateFromStr, dateToStr] = getFormattedDateStrings(getDateFromString(data.education[i].dateFrom), getDateFromString(data.education[i].dateTo));
        form.getTextField(`education.${i}.1`).setText(`${dateFromStr} - ${dateToStr}`);

        form.getTextField(`education.${i}.2`).setText(`${data.education[i].description}`);
    }
    
    // Erase any not used text
    if (data.education.length < maxEducationLength) {
        for (let i = 0; i < maxEducationLength - data.education.length; i += 1) {
            form.getTextField(`education.${maxEducationLength - i - 1}.0`).setText(' ');
            form.getTextField(`education.${maxEducationLength - i - 1}.1`).setText(' ');
            form.getTextField(`education.${maxEducationLength - i - 1}.2`).setText(' ');
        }
    }

    // Draw additional fields
    if (templateName === 'Simple') {
        form.getTextField(`projects`).setText(`${(data as ExtendedResume).projects.join('\n')}`);
        form.getTextField(`languages`).setText(`${(data as ExtendedResume).languages.join('\n')}`);
    }
}

function triggerDownload(objectURL: string): void {
    // Create a link to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = objectURL;
    downloadLink.download = 'resume.pdf';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
}

async function createDownloadableURL(targetDoc: PDFDocument): Promise<string> {
    // Save the copy
    const pdfBytes = await targetDoc.save();
    
    // Convert to a blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf'});
    
    // Create an URL
    const objectURL = window.URL.createObjectURL(blob);
    
    return objectURL;
}

export default async function exportResume(templateName: string, data: BasicResume | ExtendedResume): Promise<void> {
    // Fetch bytes
    const existingBytes = await getExistingBytes(templateName);
    
    // Load the original document
    const srcDoc = await PDFDocument.load(existingBytes);
    
    // Edit
    editFields(srcDoc.getForm(), data, templateName);
    
    const objectURL = await createDownloadableURL(srcDoc);

    // Download the file
    triggerDownload(objectURL);
}
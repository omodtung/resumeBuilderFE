import { ResumeValues } from "./validation";
import { formatDate } from "date-fns";

export const generateResumePdf = async (resumeData: ResumeValues) => {
  try {
    const pdfMake = (await import('pdfmake/build/pdfmake')).default;
    const pdfFonts = await import('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts;

    // Helper function to check if a section has data
    const hasWorkExperience = resumeData.workExperiences && resumeData.workExperiences.filter(exp => Object.values(exp).filter(Boolean).length > 0).length > 0;
    const hasEducation = resumeData.educations && resumeData.educations.filter(edu => Object.values(edu).filter(Boolean).length > 0).length > 0;
    const hasSkills = resumeData.skills && resumeData.skills.length > 0;

    let photoDataUrl: string | undefined;

    if (resumeData.photo instanceof File) {
      // Read the file asynchronously
      photoDataUrl = await new Promise<string | undefined>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        // Ensure resumeData.photo is a File before reading
        if (resumeData.photo instanceof File) {
          reader.readAsDataURL(resumeData.photo);
        } else {
          resolve(undefined); // Should not happen with the outer check, but for safety
        }
      });
    } else if (typeof resumeData.photo === 'string' && resumeData.photo) {
      // Use the string URL directly
      // Note: pdfmake might have issues with external URLs depending on environment/setup
      // For local development server URLs like http://localhost:8080, it might work.
      // For production, it might need to be fetched server-side or converted to data URL.
      // Assuming it's a data URL or a URL pdfmake can handle for now.
      photoDataUrl = resumeData.photo;
    }

    const personalInfoContent = [
      { text: `${resumeData.firstName || ''} ${resumeData.lastName || ''}`, style: 'header' },
      { text: resumeData.jobTitle || '', style: 'subheader' },
      { text: `${resumeData.city || ''}${resumeData.city && resumeData.country ? ', ' : ''}${resumeData.country || ''}${(resumeData.city || resumeData.country) && (resumeData.phone || resumeData.email) ? ' • ' : ''}${[resumeData.phone, resumeData.email].filter(Boolean).join(' • ')}`, style: 'body' },
    ];

    const headerContent = photoDataUrl ?
      {
        columns: [
          {
            image: photoDataUrl,
            width: 100, // Approximate size based on preview
            height: 100,
            // pdfmake doesn't support border-radius directly on images
            // fit: [100, 100] // Optional: control how image fits
          },
          {
            stack: personalInfoContent,
            margin: [20, 0, 0, 0] as [number, number, number, number] // Space between image and text
          }
        ],
        columnGap: 10 // Space between columns
      } :
      { stack: personalInfoContent }; // If no photo, just use the text stack

    const documentDefinition = {
      content: [
        headerContent, // Include the header content (with or without photo)

        // Summary Section (Conditional)
        ...(resumeData.summary ? [
          // Horizontal Rule before Summary
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: resumeData.colorHex || '#000' }], margin: [0, 10, 0, 10] as [number, number, number, number] },
          { text: 'Professional profile', style: 'sectionHeader' },
          { text: resumeData.summary, style: 'summaryText', margin: [0, 5, 0, 0] as [number, number, number, number] },
        ] : []),

        // Work Experience Section (Conditional)
        ...(hasWorkExperience ? [
          // Horizontal Rule before Work Experience
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: resumeData.colorHex || '#000' }], margin: [0, 10, 0, 10] as [number, number, number, number] },
          { text: 'Work experience', style: 'sectionHeader' },
          ...(resumeData.workExperiences || []).filter(exp => Object.values(exp).filter(Boolean).length > 0).map(experience => ({
            stack: [
              {
                columns: [
                  { text: experience.position || '', style: 'jobTitle' },
                  { text: `${experience.startDate ? formatDate(experience.startDate, "MM/yyyy") : ''} - ${experience.endDate ? formatDate(experience.endDate, "MM/yyyy") : 'Present'}`, style: 'dates', alignment: 'right' },
                ]
              },
              { text: experience.company || '', style: 'body', margin: [0, 2, 0, 0] as [number, number, number, number] },
              { text: experience.description || '', style: 'jobDescription' },
            ],
            margin: [0, 5, 0, 5] as [number, number, number, number] // Add margin between experiences
          })),
        ] : []),

        // Education Section (Conditional)
        ...(hasEducation ? [
          // Horizontal Rule before Education
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: resumeData.colorHex || '#000' }], margin: [0, 10, 0, 10] as [number, number, number, number] },
          { text: 'Education', style: 'sectionHeader' },
          ...(resumeData.educations || []).filter(edu => Object.values(edu).filter(Boolean).length > 0).map(education => ({
            stack: [
              {
                columns: [
                  { text: education.degree || '', style: 'jobTitle' },
                  { text: `${education.startDate ? formatDate(education.startDate, "MM/yyyy") : ''} ${education.endDate ? `- ${formatDate(education.endDate, "MM/yyyy")}` : ""}`, style: 'dates', alignment: 'right' },
                ]
              },
              { text: education.school || '', style: 'body', margin: [0, 2, 0, 0] as [number, number, number, number] },
            ],
            margin: [0, 5, 0, 5] as [number, number, number, number] // Add margin between educations
          })),
        ] : []),

        // Skills Section (Conditional)
        ...(hasSkills ? [
          // Horizontal Rule before Skills
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: resumeData.colorHex || '#000' }], margin: [0, 10, 0, 10] as [number, number, number, number] },
          { text: 'Skills', style: 'sectionHeader' },
          {
            columns: (resumeData.skills || []).map(skill => ({
              text: skill,
              fontSize: 10, // Smaller font size to fit in "badge"
              color: '#fff', // White text color for contrast
              bold: true,
              background: resumeData.colorHex || '#000',
              margin: [0, 0, 5, 5] as [number, number, number, number], // Margin for spacing between skills
            })),
          },
        ] : []),
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 5] as [number, number, number, number],
          color: resumeData.colorHex || '#000',
        },
        subheader: {
          fontSize: 16,
          bold: false,
          margin: [0, 0, 0, 10] as [number, number, number, number],
          color: resumeData.colorHex || '#000',
        },
        body: {
          fontSize: 12,
          margin: [0, 0, 0, 2] as [number, number, number, number],
          color: '#555', // Approximate gray-500
        },
        sectionHeader: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10] as [number, number, number, number],
          color: resumeData.colorHex || '#000',
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          color: resumeData.colorHex || '#000',
        },
        dates: {
          fontSize: 14,
          bold: true,
          italics: false,
          color: resumeData.colorHex || '#000',
        },
        jobDescription: {
          fontSize: 12,
          margin: [0, 5, 0, 10] as [number, number, number, number],
        },
        summaryText: {
          fontSize: 14,
        },
      },
      defaultStyle: {
        // default style
      }
    };

    pdfMake.createPdf(documentDefinition).getBuffer((buffer) => {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

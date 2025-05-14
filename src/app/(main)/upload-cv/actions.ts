"use server";

// The token will be passed as an argument from the client-side call
// as Server Actions cannot directly access client-side sessionStorage or React hooks.

export async function uploadCV(formData: FormData, token: string | null) { // Added token parameter
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const cvFile = formData.get('cvFile') as File;

  console.log('Received upload request:');
  console.log('Name:', name);
  console.log('Phone:', phone);
  console.log('Company:', company);
  console.log('File:', cvFile.name, cvFile.size, cvFile.type);

  const linkJobUrl = `http://localhost:8080/link-jobCV-upload-file-cv?type=${encodeURIComponent(company)}`;
  const fileUploadUrl = `http://localhost:8080/file-open-send`;

  let linkJobResponseData: any = null;

  // First fetch: Link Job/CV with company type, name, and phone
  try {
    if (!token) {
      console.error('Authentication token was not provided to the server action.');
      return { success: false, error: 'Authentication token is missing.', step: 'auth' };
    }

    const linkJobFormData = new FormData();
    linkJobFormData.append('name', name);
    linkJobFormData.append('phone', phone);
    // Add other fields if the first endpoint expects them, e.g., company name in body too
    // linkJobFormData.append('company', company); 

    console.log(`Attempting to link job/CV at: ${linkJobUrl}`);
    const linkResponse = await fetch(linkJobUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: null,
    });

    if (linkResponse.ok) {
      try {
        linkJobResponseData = await linkResponse.json(); // Or .text() if not JSON
        console.log('Successfully linked job/CV:', linkJobResponseData);
      } catch (e) {
        // If response is OK but not JSON (e.g. empty or text)
        const textResponse = await linkResponse.text(); // Re-read as text
        console.log('Successfully linked job/CV (non-JSON response):', textResponse);
        linkJobResponseData = textResponse || "No content"; 
      }
    } else {
      const errorText = await linkResponse.text();
      console.error('Failed to link job/CV:', linkResponse.status, errorText);
      return { success: false, error: `Link Job Error: ${linkResponse.status} - ${errorText}`, step: 'linkJob' };
    }
  } catch (error: any) {
    console.error('Error during link job/CV operation:', error);
    return { success: false, error: error.message || 'Unknown link job error', step: 'linkJob' };
  }

  // Second fetch: Upload the actual file
  try {
    const fileUploadFormData = new FormData();
    fileUploadFormData.append('cvFile', cvFile, cvFile.name);
    // Optionally include name and phone again if this endpoint requires them
    // and cannot correlate with the first call via session or other means.
    // If the first call returned an ID that needs to be sent with the file:
    // if (linkJobResponseData && linkJobResponseData.id) {
    //   fileUploadFormData.append('jobId', linkJobResponseData.id);
    // }

    console.log(`Attempting to upload file to: ${fileUploadUrl}`);
    const fileResponse = await fetch(fileUploadUrl, {
      method: 'POST',
      body: fileUploadFormData,
    });

    if (fileResponse.ok) {
      let fileUploadResponseData: any;
      try {
        fileUploadResponseData = await fileResponse.json(); // Or .text()
        console.log('Successfully uploaded file:', fileUploadResponseData);
      } catch(e) {
        const textResponse = await fileResponse.text();
        console.log('Successfully uploaded file (non-JSON response):', textResponse);
        fileUploadResponseData = textResponse || "No content";
      }
      return { success: true, data: { linkJob: linkJobResponseData, fileUpload: fileUploadResponseData } };
    } else {
      const errorText = await fileResponse.text();
      console.error('Failed to upload file:', fileResponse.status, errorText);
      return { success: false, error: `File Upload Error: ${fileResponse.status} - ${errorText}`, step: 'fileUpload' };
    }
  } catch (error: any) {
    console.error('Error during file upload operation:', error);
    return { success: false, error: error.message || 'Unknown file upload error', step: 'fileUpload' };
  }
}

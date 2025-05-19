"use server";

export async function uploadCV(formData: FormData, token: string | null, userId: string | null) {
  const cvFile = formData.get('cvFile') as File;

  console.log('Received upload request for Get Company:');
  console.log('File:', cvFile.name, cvFile.size, cvFile.type);

  const queryApiUrl = `http://localhost:8080/api/agentAI/match`;
  const fileUploadUrl = `http://localhost:8080/file-cv-match-ai`;

  // First fetch: Send query and userId
  let queryResponseData: any = null;
  try {
    if (!userId) {
      console.error('User ID was not provided.');
      return { success: false, error: 'User ID is missing.', step: 'userId' };
    }

    const queryPayload = {
      query: 'List all Skills in CV return as string only has skills and nothing else in front of it, for example abc cbd',
      userId: userId,
    };

    console.log(`Attempting to send query to: ${queryApiUrl}`);
    const queryResponse = await fetch(queryApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryPayload),
    });

    if (queryResponse.ok) {
      queryResponseData = await queryResponse.json();
      console.log('Query sent successfully:', queryResponseData);
    } else {
      const errorText = await queryResponse.text();
      console.error('Failed to send query:', queryResponse.status, errorText);
      return { success: false, error: `Query Error: ${queryResponse.status} - ${errorText}`, step: 'query' };
    }
  } catch (error: any) {
    console.error('Error during query operation:', error);
    return { success: false, error: error.message || 'Unknown query error', step: 'query' };
  }

  // Second fetch: Upload the file
  try {
    if (!token) {
      console.error('Authentication token was not provided.');
      return { success: false, error: 'Authentication token is missing.', step: 'auth' };
    }

    const fileUploadFormData = new FormData();
    fileUploadFormData.append('File', cvFile, cvFile.name);

    console.log(`Attempting to upload file to: ${fileUploadUrl}`);
    const fileResponse = await fetch(fileUploadUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fileUploadFormData,
    });

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      console.error('Failed to upload file:', fileResponse.status, errorText);
      return { success: false, error: `File Upload Error: ${fileResponse.status} - ${errorText}`, step: 'fileUpload' };
    }

    console.log('File uploaded successfully.');
    return { success: true, data: queryResponseData.companyName || 'Unknown Company' }; // Return company name
  } catch (error: any) {
    console.error('Error during file upload operation:', error);
    return { success: false, error: error.message || 'Unknown file upload error', step: 'fileUpload' };
  }
}

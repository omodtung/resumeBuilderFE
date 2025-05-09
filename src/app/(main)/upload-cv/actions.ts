"use server";

export async function uploadCV(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const cvFile = formData.get('cvFile') as File;

  console.log('Received upload request:');
  console.log('Name:', name);
  console.log('Phone:', phone);
  console.log('Company:', company);
  console.log('File:', cvFile.name, cvFile.size, cvFile.type);

  const uploadUrl = `http://localhost:8080/link-jobCV-upload-file-cv?type=${encodeURIComponent(company)}`;

  try {
    // Create a new FormData for the fetch request if you need to modify it
    // or if the original formData is consumed/locked by Next.js server actions.
    // For simplicity, we'll try to use the original formData directly.
    // If issues arise, create a new FormData and append fields manually.
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      // Headers might not be strictly necessary if the server is lenient,
      // as FormData typically sets 'Content-Type' to 'multipart/form-data' automatically.
      // However, if the server requires it explicitly:
      // headers: {
      //   // 'Content-Type': 'multipart/form-data', // Usually set by browser/fetch with FormData
      // },
    });

    if (response.ok) {
      const responseData = await response.json(); // Or response.text() if not JSON
      console.log('Successfully uploaded to backend:', responseData);
      return { success: true, data: responseData };
    } else {
      const errorText = await response.text();
      console.error('Failed to upload to backend:', response.status, errorText);
      return { success: false, error: `Backend Error: ${response.status} - ${errorText}` };
    }
  } catch (error: any) {
    console.error('Error during fetch operation:', error);
    return { success: false, error: error.message || 'Unknown fetch error' };
  }
}

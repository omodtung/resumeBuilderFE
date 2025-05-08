"use server";

export async function uploadCV(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const cvFile = formData.get('cvFile') as File;

  console.log('Received upload request:');
  console.log('Name:', name);
  console.log('Phone:', phone);
  console.log('File:', cvFile.name, cvFile.size, cvFile.type);

  // In a real application, you would handle file storage here.
  // Example: await saveFile(cvFile);

  return { success: true };
}

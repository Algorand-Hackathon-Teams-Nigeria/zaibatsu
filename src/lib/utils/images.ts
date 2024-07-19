import axios from "axios";

export async function downloadImageAsFile(url: string, fileName: string): Promise<File> {
  try {
    // Download the image as a Blob
    const response = await axios.get(url, { responseType: "blob" });
    const blob = response.data;

    // Determine the image type
    const mimeType = response.headers["content-type"] || "image/png";

    // Convert the Blob to a File
    const file = new File([blob], fileName, { type: mimeType });

    return file;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

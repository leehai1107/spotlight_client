// Import the required functions from Firebase SDK
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "./config";

/**
 * Uploads an image to Firebase Storage.
 *
 * @param {File} file - The image file to upload.
 * @param {string} folderPath - The folder path in Firebase Storage where the image will be uploaded.
 * @returns {Promise<string>} - Returns a promise that resolves with the download URL of the uploaded image.
 */
export const uploadImage = async (file, folderPath) => {
  try {
    if (!file) throw new Error("No file provided");

    // Create a storage reference to a file in the specified folder combined with uuid for the file name
    const storageRef = ref(
      firebaseStorage,
      `${folderPath}/${Date.now()}-${file.name}`
    );

    // Upload the file to the reference location in Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

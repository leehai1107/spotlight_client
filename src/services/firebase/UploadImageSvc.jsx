// Import the required functions from Firebase SDK
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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

/**
 * Deletes an image from Firebase Storage.
 *
 * @param {string} imagePath - The full path of the image to delete in Firebase Storage.
 * @returns {Promise<void>} - Returns a promise that resolves when the image is deleted.
 */
export const deleteImage = async (imagePath) => {
  try {
    if (!imagePath) throw new Error("No image path provided");

    // Create a reference to the file to be deleted
    const imageRef = ref(firebaseStorage, imagePath);

    // Delete the file from Firebase Storage
    await deleteObject(imageRef);

    console.log("Image successfully deleted");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Converts a base64 string to a Blob.
 *
 * @param {string} base64String - The base64 image string.
 * @returns {Blob} - The Blob representing the image.
 */
const base64ToBlob = (base64String) => {
  const byteString = atob(base64String.split(",")[1]);
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};

/**
 * Uploads an image to Firebase Storage.
 *
 * @param {string} base64Image - The base64 image string to upload.
 * @param {string} folderPath - The folder path in Firebase Storage where the image will be uploaded.
 * @returns {Promise<string>} - Returns a promise that resolves with the download URL of the uploaded image.
 */
export const uploadImageBase64 = async (base64Image, folderPath) => {
  try {
    if (!base64Image) throw new Error("No image provided");

    // Convert base64 image to Blob
    const imageBlob = base64ToBlob(base64Image);

    // Create a storage reference to a file in the specified folder
    const storageRef = ref(firebaseStorage, `${folderPath}/${Date.now()}.png`);

    // Upload the Blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, imageBlob);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

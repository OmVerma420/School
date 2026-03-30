import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// ... inside your Faculty Create Assignment component:

const pickAndCompressImage = async () => {
  // 1. Open the phone's gallery
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Lets the teacher crop the worksheet
    quality: 1, // Start with highest quality from the camera
  });

  if (!result.canceled) {
    const originalUri = result.assets[0].uri;

    try {
      // 2. THE MAGIC: Compress the image on the phone!
      const compressedImage = await ImageManipulator.manipulateAsync(
        originalUri,
        [{ resize: { width: 1080 } }], // Resize it so it isn't 4K resolution
        { 
          compress: 0.7, // Compress quality to 70% (Looks great, tiny file size)
          format: ImageManipulator.SaveFormat.JPEG 
        }
      );

      // 3. Now you have a tiny, fast image to send to your backend!
      console.log("Compressed file ready to upload:", compressedImage.uri);
      
      // Save it to your React state to display on the screen
      // setFileUri(compressedImage.uri); 

    } catch (error) {
      console.log("Error compressing image:", error);
    }
  }
};
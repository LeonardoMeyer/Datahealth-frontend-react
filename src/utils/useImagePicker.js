// hooks/useImagePicker.js
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return {
    imageUri,
    setImageUri,
    handleImagePicker,
  };
};

import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageSelectorProps {
  label: string;
  onImageSelected: (image: any) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setSelectedImage(image);
      onImageSelected(image);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TouchableOpacity onPress={selectImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

// FormWithImages.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import ImageSelector from './ImageSelector';
import { uploadImagesToS3 } from '@/utils/imageUploader';
import api from '@/api';

const FormWithImages = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<{ [key: string]: any }>({});

  const handleImageSelected = (fieldName: string, image: any) => {
    setImages({ ...images, [fieldName]: image });
  };

  const submitForm = async () => {
    try {
      // Step 1: Create the object without images
      const data = {
        title,
        description,
      };

      const response = await api.post('api/item/', data);
      const itemId = response.data.id;

      // Prepare images to upload
      const imagesToUpload = Object.entries(images).map(([fieldName, image]) => ({
        image,
        key: `item/${itemId}/${fieldName}.png`,
      }));

      // Step 2: Upload images to S3
      await uploadImagesToS3(imagesToUpload);

      // Define imageKeys with explicit type
      const imageKeys: { [key: string]: string } = {};
      imagesToUpload.forEach(({ key }) => {
        const fieldName = key.split('/').pop()?.split('.')[0]; // Extract field name from key
        if (fieldName) {
          imageKeys[fieldName] = key;
        }
      });

      // Step 3: Update the item with image keys
      await api.put(`api/item/${itemId}/update_images/`, {
        images: imageKeys,
      });

      alert('Item created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <ScrollView>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text>Main Image:</Text>
      <ImageSelector
        label="Select Main Image"
        onImageSelected={(image) => handleImageSelected('mainImage', image)}
      />

      <Text>Thumbnail Image:</Text>
      <ImageSelector
        label="Select Thumbnail Image"
        onImageSelected={(image) => handleImageSelected('thumbnail', image)}
      />

      {/* Additional image selectors can be added here */}

      <Button title="Submit" onPress={submitForm} />
    </ScrollView>
  );
};

export default FormWithImages;

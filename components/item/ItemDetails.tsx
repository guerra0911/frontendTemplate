import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import api from '@/api';

interface ItemDetailsProps {
  itemId: number;
}

interface Item {
  id: number;
  title: string;
  description: string;
  images: { [key: string]: string };
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ itemId }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`api/item/${itemId}/`);
        setItem(response.data);

        // Fetch pre-signed URLs for images
        const images = response.data.images;
        const urls: { [key: string]: string } = {};

        for (const [fieldName, key] of Object.entries(images)) {
          const urlResponse = await api.get('api/media/get_image_presigned_url/', {
            params: { key },
          });
          urls[fieldName] = urlResponse.data.url;
        }

        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>

      {imageUrls.mainImage && (
        <Image
          source={{ uri: imageUrls.mainImage }}
          style={{ width: 200, height: 200 }}
        />
      )}

      {imageUrls.thumbnail && (
        <Image
          source={{ uri: imageUrls.thumbnail }}
          style={{ width: 100, height: 100 }}
        />
      )}

      {/* Display additional images if present */}
      {Object.entries(imageUrls).map(([fieldName, url]) => {
        if (fieldName !== 'mainImage' && fieldName !== 'thumbnail') {
          return (
            <Image
              key={fieldName}
              source={{ uri: url }}
              style={{ width: 100, height: 100 }}
            />
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

export default ItemDetails;

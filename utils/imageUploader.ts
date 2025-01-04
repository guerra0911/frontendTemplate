// utils/imageUploader.ts

import api from '@/api';

interface ImageToUpload {
  image: any;
  key: string;
}

export const uploadImagesToS3 = async (images: ImageToUpload[]) => {
  const uploadedKeys: string[] = [];

  for (const item of images) {
    const { image, key } = item;

    // Fetch the image as blob
    const response = await fetch(image.uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${image.uri}, status: ${response.status}`);
    }
    const blob = await response.blob();

    // Determine MIME type
    const mimeType = blob.type || 'application/octet-stream';

    // Request pre-signed URL
    const presignedResponse = await api.get('api/media/get_presigned_url/', {
      params: { key, content_type: mimeType },
    });

    const { url: presignedUrl } = presignedResponse.data;

    // Upload to S3
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': mimeType,
      },
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Failed to upload image to S3: ${errorText}`);
    }

    // Store the uploaded image key
    uploadedKeys.push(key);
  }

  return uploadedKeys;
};

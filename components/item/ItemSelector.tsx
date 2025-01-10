import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ThemedActivityIndicator from '@/components/templates/loaders/ThemedActivityIndicator';
import api from '@/api';

interface ItemSelectorProps {
  onItemSelected: (itemId: number | undefined) => void;
}

interface Item {
  id: number;
  title: string;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ onItemSelected }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('api/item/');
        setItems(response.data);

        if (response.data.length > 0) {
          if (selectedItemId === undefined) {
            const firstItemId = response.data[0].id;
            setSelectedItemId(firstItemId);
            onItemSelected(firstItemId);
          }
        } else {
          setSelectedItemId(undefined);
          onItemSelected(undefined);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // Empty dependency array

  const handleItemChange = (value: number | null) => {
    setSelectedItemId(value || undefined);
    onItemSelected(value || undefined);
  };

  if (loading) {
    return <ThemedActivityIndicator size={24} />;
  }

  if (items.length === 0) {
    return <Text>No items available.</Text>;
  }

  const pickerItems = items.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return (
    <View style={styles.container}>
      <Text>Select an Item:</Text>
      <RNPickerSelect
        onValueChange={handleItemChange}
        items={pickerItems}
        value={selectedItemId}
        placeholder={{ label: 'Select an item', value: null }}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          iconContainer: styles.iconContainer,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                borderTopWidth: 10,
                borderTopColor: 'gray',
                borderRightWidth: 10,
                borderRightColor: 'transparent',
                borderLeftWidth: 10,
                borderLeftColor: 'transparent',
                width: 0,
                height: 0,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default ItemSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  iconContainer: {
    top: Platform.OS === 'android' ? 15 : 20,
    right: 10,
  },
});
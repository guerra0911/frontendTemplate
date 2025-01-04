// app/(tabs)/objects/objects.tsx

import React, { useCallback, useState } from 'react';
import ThemedTabbedScrollContainer from '@/components/templates/containers/ThemedTabbedScrollContainer';
import { useColorScheme } from '@/hooks/useColorScheme';
import AllObjectsTab from '../screens/objects/AllObjectsTab';
import MyObjectsTab from '../screens/objects/MyObjectsTab';

export default function ObjectsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate 1-second refresh
  }, []);

  const tabs = [
    {
      label: 'All Objects',
      component: <AllObjectsTab />,
    },
    {
      label: 'My Objects',
      component: <MyObjectsTab />,
    },
  ];

  return (
    <ThemedTabbedScrollContainer
      tabs={tabs}
      isScrollable={true}
      isRefreshable={true}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

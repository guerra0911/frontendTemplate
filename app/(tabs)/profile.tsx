import React, { useCallback, useState } from 'react';
import { ThemedText } from '@/components/templates/general/ThemedText';
import ThemedScrollContainer from '@/components/templates/containers/ThemedScrollContainer';

export function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate 1-second refresh
  }, []);

  return (
    <ThemedScrollContainer
      isScrollable={true}
      isRefreshable={true}
      onRefresh={onRefresh}
      refreshing={refreshing}
    >
      <ThemedText>Profile</ThemedText>
      <ThemedText type='default'>Keep transparent backgrounds for these components rendered so that the background color stays true to the theme</ThemedText>
    </ThemedScrollContainer>
  );
}

export default ProfileScreen;
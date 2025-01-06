/**
 * ThemedFABExamples.tsx
 *
 * Demonstrates usage of ThemedFABGroup with examples analogous to
 * React Native Paper’s official FAB.Group docs.
 */

import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ThemedFABGroup from '@/components/templates/buttons/ThemedFABGroup';
import { ThemedText } from '@/components/templates/general/ThemedText';

import type { IconName } from '@/components/templates/icons/ThemedIcon';
import type { ThemedFABGroupAction } from '@/components/templates/buttons/ThemedFABGroup';

export default function ThemedFABExamples() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const actions1: ThemedFABGroupAction[] = [
    {
      iconName: 'home' as IconName,
      label: 'Home',
      onPress: () => Alert.alert('Home pressed'),
    },
    {
      iconName: 'star' as IconName,
      label: 'Star',
      onPress: () => Alert.alert('Star pressed'),
    },
    {
      iconName: 'mail' as IconName,
      label: 'Email',
      onPress: () => Alert.alert('Email pressed'),
    },
    {
      iconName: 'notifications' as IconName,
      label: 'Remind',
      onPress: () => Alert.alert('Remind pressed'),
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>ThemedFABGroup Examples</ThemedText>

      <ThemedText style={{ marginVertical: 10 }}>
        Speed-dial is{' '}
        <ThemedText style={{ fontWeight: 'bold' }}>
          {open ? 'OPEN' : 'CLOSED'}
        </ThemedText>
      </ThemedText>

      {/* Main speed-dial group */}
      <ThemedFABGroup
        actions={actions1}
        open={open}
        onStateChange={({ open }) => setOpen(open)}
        iconName={open ? ('close' as IconName) : ('add' as IconName)}
        onPress={() => {
          if (open) {
            Alert.alert('Main FAB pressed while speed-dial is open!');
          }
        }}
        visible={visible}
        label={open ? 'Close' : 'Open'}
      />

      <View style={{ marginTop: 40 }}>
        {/* A second FAB used to toggle the "visible" state of the above group */}
        <ThemedFABGroup
          actions={[]}
          open={false}
          onStateChange={() => {}}
          iconName={visible ? ('eye-off' as IconName) : ('eye' as IconName)}
          onPress={() => setVisible(!visible)}
          visible
          label={visible ? 'Hide Speed-Dial' : 'Show Speed-Dial'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

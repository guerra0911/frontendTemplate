/**
 * ThemedFABExamples2.tsx
 *
 * Demonstrates a speed-dial with customized props for the main FAB (both open and closed states)
 * and for the mini-FABs, mimicking React Native Paper's advanced usage examples.
 */

import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ThemedFABGroup from '@/components/templates/buttons/ThemedFABGroup';
import { ThemedText } from '@/components/templates/typography/ThemedText';

import type { IconName } from '@/components/templates/icons/ThemedIcon';
import type { ThemedFABGroupAction } from '@/components/templates/buttons/ThemedFABGroup';

export default function ThemedFABExamples2() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const actions1: ThemedFABGroupAction[] = [
    {
      iconName: 'heart' as IconName,
      label: 'Like',
      onPress: () => Alert.alert('Like pressed'),
    },
    {
      iconName: 'chatbubbles' as IconName,
      label: 'Message',
      onPress: () => Alert.alert('Message pressed'),
    },
    {
      iconName: 'share' as IconName,
      label: 'Share',
      onPress: () => Alert.alert('Share pressed'),
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

      {/* Customized speed-dial with color/border changes */}
      <ThemedFABGroup
        actions={actions1}
        open={open}
        onStateChange={({ open }) => setOpen(open)}
        iconName={open ? ('close' as IconName) : ('add' as IconName)}
        onPress={() => {
          if (open) {
            Alert.alert('Main FAB pressed while open!');
          }
        }}
        visible={visible}
        closedMainFabProps={{
          size: 'large',
          backgroundColor: { light: '#800080', dark: '#800080' }, // Purple
          borderColor: { light: 'yellow', dark: 'yellow' },
          borderWidth: 3,
          borderStyle: 'solid',
          iconName: 'add',
          elevation: 8,
        }}
        openMainFabProps={{
          size: 'large',
          backgroundColor: { light: 'orange', dark: 'orange' },
          borderColor: { light: 'blue', dark: 'blue' },
          borderWidth: 3,
          borderStyle: 'solid',
          iconName: 'close',
          elevation: 10,
        }}
        miniFabProps={{
          size: 'small',
          backgroundColor: { light: '#FFA500', dark: '#FFA500' },
          borderColor: { light: 'green', dark: 'green' },
          borderWidth: 2,
          borderStyle: 'solid',
          elevation: 5,
        }}
        label={open ? 'Close' : 'Open'}
        speedDialToMainSpacing={0}
      />

      <View style={{ marginTop: 40 }}>
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

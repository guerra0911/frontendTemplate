/**
 * ThemedRadioButtonListItemExamples.tsx
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedRadioButtonListItem from "@/components/templates/lists/ThemedRadioButtonListItem";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import ThemedActivityIndicator from "@/components/templates/loaders/ThemedActivityIndicator";

export default function ThemedRadioButtonListItemExamples() {
  const [radio1, setRadio1] = useState(false);
  const [radio2, setRadio2] = useState(true);
  const [radio3, setRadio3] = useState(false);
  const [radio4, setRadio4] = useState(false);
  const [radio5, setRadio5] = useState(false);
  const [radio6, setRadio6] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        ThemedRadioButtonListItem Examples
      </ThemedText>

      <ThemedRadioButtonListItem
        title="Default radio (left)"
        value={radio1}
        onValueChange={setRadio1}
      />
      <ThemedRadioButtonListItem
        title="Radio on Right"
        radioPosition="right"
        value={radio2}
        onValueChange={setRadio2}
        description="Radio at right side"
      />
      <ThemedDivider />

      <ThemedText type="subtitle">Tap entire item to toggle</ThemedText>
      <ThemedRadioButtonListItem
        toggleOnPressItem
        title="Tap anywhere"
        description="Pressing item toggles"
        value={radio3}
        onValueChange={setRadio3}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">Custom size + spacing</ThemedText>
      <ThemedRadioButtonListItem
        title="Custom sized radio"
        value={radio4}
        onValueChange={setRadio4}
        width={280}
        height={50}
        leftToContentSpacing={25}
        radioProps={{
          customSize: 32,
          iconName: "heart",
          iconLibrary: "FontAwesome",
        }}
        description="Large radio w/heart icon"
      />

      <ThemedText type="subtitle">No ripple effect on item press</ThemedText>
      <ThemedRadioButtonListItem
        title="No ripple radio item"
        value={radio5}
        onValueChange={setRadio5}
        disableRippleEffect
      />

      <ThemedText type="subtitle">
        Embed ThemedActivityIndicator in leftChildren
      </ThemedText>
      <ThemedRadioButtonListItem
        value={radio6}
        onValueChange={setRadio6}
        leftChildren={<ThemedActivityIndicator animating />}
        title="Title is still here"
        description="But we also have an ActivityIndicator on left"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
});

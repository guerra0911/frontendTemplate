// frontendTemplate/app/Messages.tsx

import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/general/ThemedText";

// Importing the new example components
import ThemedButtonExamples from "@/components/examples/buttons/ThemedButtonExamples";
import ThemedIconExamples from "@/components/examples/icons/ThemedIconExamples";
import ThemedImageButtonExamples from "@/components/examples/buttons/ThemedImageButtonExamples";
import ThemedToggleSwitchExamples from "@/components/examples/buttons/ThemedToggleSwitchExamples";
import ThemedSegmentedControlExamples from "@/components/examples/buttons/ThemedSegmentedControlExamples";
import ThemedTextButtonExamples from "@/components/examples/buttons/ThemedTextButtonExamples";
import ThemedToggleButtonExamples from "@/components/examples/buttons/ThemedToggleButtonExamples";
import ThemedChoiceChipsExample from "@/components/examples/buttons/ThemedChoiceChipsExamples";
import ThemedCheckBoxExamples from "@/components/examples/buttons/ThemedCheckBoxExamples";
import ThemedRadioButtonExamples from "@/components/examples/buttons/ThemedRadioButtonExamples";
import ThemedDateTimeSelectorExamples from "@/components/examples/dateTime/ThemedDateTimeSelectorExamples";
import ThemedCalendarSelectorExamples from "@/components/examples/dateTime/ThemedCalendarSelectorExamples";
import ThemedContextMenuExamples from "@/components/examples/containers/ThemedContextMenuExamples";
import ThemedDropDownPickerExamples from "@/components/examples/buttons/ThemedDropDownPickerExamples";
import ThemedSurfaceExamples from "@/components/examples/containers/ThemedSurfaceExamples";
import ThemedTouchableRippleExamples from "@/components/examples/buttons/ThemedTouchableRippleExamples";
import ThemedActivityIndicatorExamples from "@/components/examples/loaders/ThemedActivityIndicatorExamples";
import ThemedCrossFadeIconExamples from "@/components/examples/icons/ThemedCrossFadeIconExamples";
import ThemedFABExamples from "@/components/examples/buttons/ThemedFABExamples";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";
import ThemedFABExamples2 from "@/components/examples/buttons/ThemedFABExamples2";
import ThemedChasingDotLoadingIndicatorExamples from "@/components/examples/loaders/ChasingDotLoadingIndicatorExamples";

export default function MessagesScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a refresh action, e.g., fetching new messages
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
      <ThemedText style={styles.title}>Messages</ThemedText>

      {/* Themed Button Examples */}
      <ThemedButtonExamples />

      {/* Themed Icon Examples */}
      <ThemedIconExamples />

      {/* Themed Cross Fade Icon Examples */}
      <ThemedCrossFadeIconExamples />

      {/* Themed Image Button Examples */}
      <ThemedImageButtonExamples />

      {/* Themed Text Button Examples */}
      <ThemedTextButtonExamples />

      {/* Themed Toggle Button Examples */}
      <ThemedToggleButtonExamples />

      {/* Themed Toggle Switch Examples */}
      <ThemedToggleSwitchExamples />

      {/* Themed Segmented Control Examples */}
      <ThemedSegmentedControlExamples />

      {/* Themed Choice Chips Examples */}
      <ThemedChoiceChipsExample />

      {/* Themed Check Box Examples */}
      <ThemedCheckBoxExamples />

      {/* Themed Radio Button Examples */}
      <ThemedRadioButtonExamples />

      {/* Themed Context Menu Examples */}
      <ThemedContextMenuExamples />

      {/* Themed Drop Down Picker Examples */}
      <ThemedDropDownPickerExamples />

      {/* Themed Date Time Selector Examples */}
      <ThemedDateTimeSelectorExamples />

      {/* Themed Calendar Selector Examples */}
      <ThemedCalendarSelectorExamples />

      {/* Themed Surface Examples */}
      <ThemedSurfaceExamples />

      {/* Themed Card Examples */}
      <ThemedCardExamples />

      {/* Themed Touchable Ripple Examples */}
      <ThemedTouchableRippleExamples />

      {/* Themed Activity Indicator Examples */}
      <ThemedActivityIndicatorExamples />

      {/* Themed Chasing Dot Loading Indicator Examples */}
      <ThemedChasingDotLoadingIndicatorExamples />

      {/* Themed FAB Examples */}
      <ThemedFABExamples />

      {/* Themed FAB Examples 2 */}
      <ThemedFABExamples2 />

    </ThemedScrollContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

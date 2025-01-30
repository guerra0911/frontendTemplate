// app/(tabs)/messages/index.tsx

import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";

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
import ThemedChasingDotLoadingIndicatorExamples from "@/components/examples/loaders/ThemedChasingDotLoadingIndicatorExamples";
import ThemedCollapsibleExamples from "@/components/examples/general/ThemedCollapsibleExamples";
import ThemedTextExamples from "@/components/examples/typography/ThemedTextExamples";
import ThemedAnimatedTextExamples from "@/components/examples/typography/ThemedAnimatedTextExamples";
import ThemedExternalLinkExamples from "@/components/examples/typography/ThemedExternalLinkExamples";
import ThemedAvatarExamples from "@/components/examples/avatars/ThemedAvatarExamples";
import ThemedDividerExamples from "@/components/examples/general/ThemedDividerExamples";
import ThemedListItemExamples from "@/components/examples/lists/ThemedListItemExamples";
import ThemedListSectionExamples from "@/components/examples/lists/ThemedListSectionExamples";
import ThemedListAccordionExamples from "@/components/examples/lists/ThemedListAccordionExamples";
import ThemedListAccordionGroupExamples from "@/components/examples/lists/ThemedListAccordionGroupExamples";
import ThemedCheckboxListItemExamples from "@/components/examples/lists/ThemedCheckboxListItemExamples";
import ThemedRadioButtonListItemExamples from "@/components/examples/lists/ThemedRadioButtonListItemExamples";
import ThemedToggleSwitchListItemExamples from "@/components/examples/lists/ThemedToggleSwitchListItemExamples";

import ThemedPage from "@/components/templates/pages/ThemedPage";
import { ThemedStaticHeader } from "@/components/templates/pages/ThemedStaticHeader";

export default function MessagesScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ThemedStaticHeader
      headerProps={{
        renderCenter: () => (
          <ThemedText type="subtitle" margin={8} padding={2}>
            MESSAGES
          </ThemedText>
        ),
        renderLeft: () => null,
        noBottomBorder: false,
        
      }}
      scrollViewBackgroundColor={{
        light: "#d1c4e9", // Custom light background color
        dark: "#512da8",  // Custom dark background color
      }}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Themed Text Examples */}
      <ThemedTextExamples />

      {/* Themed Animated Text Examples */}
      <ThemedAnimatedTextExamples />

      {/* Themed External Link Examples */}
      <ThemedExternalLinkExamples />

      {/* Themed Button Examples */}
      <ThemedButtonExamples />

      {/* Themed Toggle Button Examples */}
      <ThemedToggleButtonExamples />

      {/* Themed Icon Examples */}
      <ThemedIconExamples />

      {/* Themed Cross Fade Icon Examples */}
      <ThemedCrossFadeIconExamples />

      {/* Themed Image Button Examples */}
      <ThemedImageButtonExamples />

      {/* Themed Text Button Examples */}
      <ThemedTextButtonExamples />

      {/* Themed Avatar Examples */}
      <ThemedAvatarExamples />

      {/* Themed Divider Examples */}
      <ThemedDividerExamples />

      {/* Themed List Item Examples */}
      <ThemedListItemExamples />

      {/* Themed List Section Examples */}
      <ThemedListSectionExamples />

      {/* Themed List Accordion Examples */}
      <ThemedListAccordionExamples />

      {/* Themed List Accordion Group Examples */}
      <ThemedListAccordionGroupExamples />

      {/* Themed Check Box List Item Examples */}
      <ThemedCheckboxListItemExamples />

      {/* Themed Radio Button List Item Examples */}
      <ThemedRadioButtonListItemExamples />

      {/* Themed Toggle Switch List Item Examples */}
      <ThemedToggleSwitchListItemExamples />

      {/* Themed Toggle Switch Examples */}
      <ThemedToggleSwitchExamples />

      {/* Themed Check Box Examples */}
      <ThemedCheckBoxExamples />

      {/* Themed Radio Button Examples */}
      <ThemedRadioButtonExamples />

      {/* Themed Segmented Control Examples */}
      <ThemedSegmentedControlExamples />

      {/* Themed Choice Chips Examples */}
      <ThemedChoiceChipsExample />

      {/* Themed Collapsible Examples */}
      <ThemedCollapsibleExamples />

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
    </ThemedStaticHeader>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedSegmentedControl from "@/components/templates/buttons/ThemedSegmentedControl";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedSegmentedControlExamples: React.FC = () => {
  const [selectedPrimary, setSelectedPrimary] = useState(0);
  const [selectedSecondary, setSelectedSecondary] = useState(1);
  const [selectedTertiary, setSelectedTertiary] = useState(2);
  const [customColors, setCustomColors] = useState(0);
  const [customDimensions, setCustomDimensions] = useState(0);
  const [customRadius, setCustomRadius] = useState(0);
  const [factorRadius, setFactorRadius] = useState(0);
  const [custom3Borders, setCustom3Borders] = useState(0);
  const [customInternalPadding, setCustomInternalPadding] = useState(0);
  const [customAnimation, setCustomAnimation] = useState(0);
  const [customCurves, setCustomCurves] = useState(0);
  const [customText, setCustomText] = useState(0);
  const [customIconsDisplay, setCustomIconsDisplay] = useState(0);
  const [iconPositionExample, setIconPositionExample] = useState(0);
  const [iconOnlyExample, setIconOnlyExample] = useState(0);
  const [defaultSeparators, setDefaultSeparators] = useState(0);
  const [customSeparators, setCustomSeparators] = useState(0);
  const [shadowDefault, setShadowDefault] = useState(0);
  const [shadowCustom, setShadowCustom] = useState(0);
  const [customSegmentMargins, setCustomSegmentMargins] = useState(0);
  const [
    customSegmentMarginsTransparent,
    setCustomSegmentMarginsTransparent,
  ] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState(0);

  // NEW: underline example
  const [underlineExample, setUnderlineExample] = useState(0);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Primary Theme</ThemedText>
      <ThemedSegmentedControl
        values={["Option 1", "Option 2", "Option 3"]}
        selectedIndex={selectedPrimary}
        onChange={setSelectedPrimary}
        themeType="primary"
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: Option {selectedPrimary + 1}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Secondary Theme</ThemedText>
      <ThemedSegmentedControl
        values={["First", "Second"]}
        selectedIndex={selectedSecondary}
        onChange={setSelectedSecondary}
        themeType="secondary"
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {selectedSecondary === 0 ? "First" : "Second"}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Tertiary Theme</ThemedText>
      <ThemedSegmentedControl
        values={["Alpha", "Beta", "Gamma"]}
        selectedIndex={selectedTertiary}
        onChange={setSelectedTertiary}
        themeType="tertiary"
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Alpha", "Beta", "Gamma"][selectedTertiary]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Inline Colors</ThemedText>
      <ThemedSegmentedControl
        values={["Custom 1", "Custom 2"]}
        selectedIndex={customColors}
        onChange={setCustomColors}
        background={{
          light: {
            selected: "#FF6347", // Tomato color for light theme
            unselected: "#EEE", // Light gray for light theme
          },
          dark: {
            selected: "#1E90FF", // Dodger blue for dark theme
            unselected: "#333333", // Dark gray for dark theme
          },
        }}
        style={[styles.segmentedControl, { borderRadius: 12 }]}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Custom 1", "Custom 2"][customColors]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Dimensions</ThemedText>
      <ThemedSegmentedControl
        values={["Small", "Medium"]}
        selectedIndex={customDimensions}
        onChange={setCustomDimensions}
        themeType="secondary"
        customHeight={90}
        customWidth={300}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Small", "Medium"][customDimensions]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Radius</ThemedText>
      <ThemedSegmentedControl
        values={["Option 1", "Option 2", "Option 3"]}
        selectedIndex={customRadius}
        onChange={setCustomRadius}
        themeType="primary"
        style={styles.segmentedControl}
        customRadius={16}
      />
      <ThemedText style={styles.selectedText}>
        Selected: Option {customRadius + 1}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Factor (Pill) Radius</ThemedText>
      <ThemedSegmentedControl
        values={["Option 1", "Option 2", "Option 3"]}
        selectedIndex={factorRadius}
        onChange={setFactorRadius}
        themeType="primary"
        style={styles.segmentedControl}
        customWidth={300}
        customHeight={90}
        customRadius="factor"
      />
      <ThemedText style={styles.selectedText}>
        Selected: Option {factorRadius + 1}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom 3 Borders</ThemedText>
      <ThemedSegmentedControl
        values={["Option 1", "Option 2", "Option 3"]}
        selectedIndex={custom3Borders}
        onChange={setCustom3Borders}
        themeType="primary"
        style={styles.segmentedControl}
        customWidth={300}
        customHeight={90}
        borders={{
          main: {
            color: { light: "#0000FF", dark: "#00FFFF" },
            width: 4,
          },
          selected: {
            color: { light: "#00FF00", dark: "#00FF00" },
            width: 4,
          },
          unselected: {
            color: { light: "#FF0000", dark: "#FF0000" },
            width: 4,
          },
        }}
        customRadius="factor"
      />
      <ThemedText style={styles.selectedText}>
        Selected: Option {custom3Borders + 1}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>
        Custom Internal Padding
      </ThemedText>
      <ThemedSegmentedControl
        values={["First", "Second", "Third"]}
        selectedIndex={customInternalPadding}
        onChange={setCustomInternalPadding}
        themeType="secondary"
        customHeight={50}
        customWidth={300}
        padding={{
          internal: 10,
          color: { light: "#e7f705", dark: "#00ffff" },
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["First", "Second", "Third"][customInternalPadding]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Animation</ThemedText>
      <ThemedSegmentedControl
        values={["First", "Second", "Third"]}
        selectedIndex={customAnimation}
        onChange={setCustomAnimation}
        themeType="primary"
        customWidth={300}
        animatedSwitch={true}
        padding={{
          internal: 10,
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["First", "Second", "Third"][customAnimation]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Curves</ThemedText>
      <ThemedSegmentedControl
        values={["First", "Second", "Third"]}
        selectedIndex={customCurves}
        onChange={setCustomCurves}
        themeType="primary"
        roundedAllCorners={true}
        animatedSwitch={true}
        padding={{
          internal: 10,
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["First", "Second", "Third"][customCurves]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Texts</ThemedText>
      <ThemedSegmentedControl
        values={["First", "Second", "Third"]}
        selectedIndex={customText}
        onChange={setCustomText}
        themeType="primary"
        roundedAllCorners={true}
        animatedSwitch={true}
        background={{
          light: {
            selected: "#FFD700", // Gold for light theme
            unselected: "#EEE",   // Light gray
          },
          dark: {
            selected: "#FF8C00", // Dark orange for dark theme
            unselected: "#222222",
          },
        }}
        text={{
          selectedStyle: {
            fontWeight: "bold",
            textDecorationLine: "underline",
            fontStyle: "italic",
            fontSize: 20,
          },
          unselectedStyle: {
            fontWeight: "normal",
            textDecorationLine: "none",
            fontStyle: "normal",
            fontSize: 14,
          },
          colors: {
            light: {
              selected: "#000000",
              unselected: "#555555",
            },
            dark: {
              selected: "#FFFFFF",
              unselected: "#BBBBBB",
            },
          },
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["First", "Second", "Third"][customText]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>
        Custom Icons with Custom Colors and Icon Position
      </ThemedText>
      <ThemedSegmentedControl
        values={["Home", "Settings", "Profile"]}
        selectedIndex={customIconsDisplay}
        onChange={setCustomIconsDisplay}
        themeType="primary"
        customWidth={370}
        icons={{
          definitions: [
            {
              iconName: "home",
              iconLibrary: "Ionicons",
              iconSize: 24,
              iconPosition: "left",
              iconPadding: {
                right: 12,
              },
            },
            {
              iconName: "settings",
              iconLibrary: "MaterialIcons",
              iconSize: 24,
              iconPosition: "right",
              iconPadding: {
                left: 12,
              },
            },
            {
              iconName: "user",
              iconLibrary: "FontAwesome",
              iconSize: 24,
              iconPosition: "right",
              iconPadding: {
                right: 12,
              },
            },
          ],
          colors: {
            light: {
              selected: "#ff0000",   // Red for selected icons in light theme
              unselected: "#cccccc", // Light gray for unselected icons
            },
            dark: {
              selected: "#00ff00",   // Green for selected icons in dark theme
              unselected: "#666666", // Dark gray for unselected icons
            },
          },
        }}
        roundedAllCorners={true}
        animatedSwitch={true}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Home", "Settings", "Profile"][customIconsDisplay]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Icon Position Examples</ThemedText>
      <ThemedSegmentedControl
        values={["Top Icon", "Middle", "Bottom Icon"]}
        selectedIndex={iconPositionExample}
        onChange={setIconPositionExample}
        themeType="primary"
        customHeight={80}
        customWidth={350}
        icons={{
          definitions: [
            {
              iconName: "arrow-up",
              iconLibrary: "Ionicons",
              iconSize: 24,
              iconPosition: "top",
              iconPadding: { bottom: 10 },
            },
            {
              iconName: "menu",
              iconLibrary: "Ionicons",
              iconSize: 24,
              iconPosition: "left",
              iconPadding: { right: 10 },
            },
            {
              iconName: "arrow-down",
              iconLibrary: "Ionicons",
              iconSize: 24,
              iconPosition: "bottom",
              iconPadding: { top: 10 },
            },
          ],
          colors: {
            light: {
              selected: "#0000FF",
              unselected: "#999999",
            },
            dark: {
              selected: "#00FFFF",
              unselected: "#666666",
            },
          },
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Top Icon", "Middle", "Bottom Icon"][iconPositionExample]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Icon-Only Segments</ThemedText>
      <ThemedSegmentedControl
        values={["", "", ""]}
        selectedIndex={iconOnlyExample}
        onChange={setIconOnlyExample}
        themeType="primary"
        icons={{
          definitions: [
            {
              iconName: "home",
              iconLibrary: "Ionicons",
              iconSize: 24,
              iconPosition: "top",
              iconPadding: { bottom: 0 },
            },
            {
              iconName: "settings",
              iconLibrary: "MaterialIcons",
              iconSize: 24,
              iconPosition: "top",
              iconPadding: { bottom: 0 },
            },
            {
              iconName: "user",
              iconLibrary: "FontAwesome",
              iconSize: 24,
              iconPosition: "top",
              iconPadding: { bottom: 0 },
            },
          ],
          colors: {
            light: {
              selected: "#0000FF",
              unselected: "#999999",
            },
            dark: {
              selected: "#00FFFF",
              unselected: "#666666",
            },
          },
        }}
        roundedAllCorners={true}
        animatedSwitch={true}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected Icon: {["Home", "Settings", "Profile"][iconOnlyExample]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Default Separators</ThemedText>
      <ThemedSegmentedControl
        values={["Home", "Settings", "Profile"]}
        selectedIndex={defaultSeparators}
        onChange={setDefaultSeparators}
        separator={{
          show: true,
        }}
        customHeight={50}
        customWidth={300}
        animatedSwitch={true}
      />

      <ThemedText style={styles.sectionTitle}>Custom Separators</ThemedText>
      <ThemedSegmentedControl
        values={["Home", "Settings", "Profile"]}
        selectedIndex={customSeparators}
        onChange={setCustomSeparators}
        separator={{
          show: true,
          width: 2,
          height: 0.6,
          colors: {
            light: "#00BFFF",
            dark: "#1E90FF",
          },
        }}
        animatedSwitch={true}
        customHeight={50}
        customWidth={300}
      />

      <ThemedText style={styles.sectionTitle}>Default Shadow</ThemedText>
      <ThemedSegmentedControl
        values={["Default 1", "Default 2", "Default 3"]}
        selectedIndex={shadowDefault}
        onChange={setShadowDefault}
        themeType="primary"
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Default 1", "Default 2", "Default 3"][shadowDefault]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Custom Shadow</ThemedText>
      <ThemedSegmentedControl
        values={["Custom 1", "Custom 2", "Custom 3"]}
        selectedIndex={shadowCustom}
        onChange={setShadowCustom}
        themeType="secondary"
        shadows={{
          main: {
            color: "#555555",
            offset: { width: 4, height: 4 },
            opacity: 0.5,
            radius: 10,
            elevation: 12,
          },
          highlight: {
            color: "#00FF00",
            offset: { width: 2, height: 6 },
            opacity: 0.4,
            radius: 8,
            elevation: 10,
          },
          segment: {
            color: "#FF0000",
            offset: { width: 1, height: 2 },
            opacity: 0.3,
            radius: 5,
            elevation: 6,
          },
          colors: {
            light: {
              main: "#CCCCCC",
              highlight: "#00FF00",
              segment: "#FF0000",
            },
            dark: {
              main: "#444444",
              highlight: "#00FF00",
              segment: "#FF0000",
            },
          },
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Custom 1", "Custom 2", "Custom 3"][shadowCustom]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>
        Custom Segment Spacing Margins
      </ThemedText>
      <ThemedSegmentedControl
        values={["Default 1", "Default 2", "Default 3"]}
        selectedIndex={customSegmentMargins}
        onChange={setCustomSegmentMargins}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        segmentSpacing={20}
        roundedAllCorners={true}
        animatedSwitch={true}
        padding={{
          internal: 1,
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Default 1", "Default 2", "Default 3"][customSegmentMargins]}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>
        Custom Segment Spacing Margins Transparent
      </ThemedText>
      <ThemedSegmentedControl
        values={["Default 1", "Default 2", "Default 3"]}
        selectedIndex={customSegmentMarginsTransparent}
        onChange={setCustomSegmentMarginsTransparent}
        background={{
          light: {
            selected: "#ffffff",
            unselected: "transparent",
          },
          dark: {
            selected: "#ffffff",
            unselected: "transparent",
          },
        }}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        segmentSpacing={20}
        roundedAllCorners={true}
        animatedSwitch={true}
        padding={{
          internal: 1,
        }}
        text={{
          selectedStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
          unselectedStyle: {
            fontWeight: "normal",
            fontSize: 14,
          },
          colors: {
            light: {
              selected: "#000000",
              unselected: "#555555",
            },
            dark: {
              selected: "#FFFFFF",
              unselected: "#BBBBBB",
            },
          },
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {
          ["Default 1", "Default 2", "Default 3"][
            customSegmentMarginsTransparent
          ]
        }
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Disabled Buttons</ThemedText>
      <ThemedSegmentedControl
        values={["Default 1", "Default 2", "Default 3", "Default 4"]}
        selectedIndex={disabledButtons}
        onChange={setDisabledButtons}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        disabled={{
          indices: [1, 2],
          colors: {
            light: {
              background: "#E0E0E0",
              text: "#A0A0A0",
            },
            dark: {
              background: "#333333",
              text: "#555555",
            },
          },
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {["Default 1", "Default 2", "Default 3", "Default 4"][disabledButtons]}
      </ThemedText>

      {/* UNDERLINE INDICATOR EXAMPLE */}
      <ThemedText style={styles.sectionTitle}>Underline Indicator Example</ThemedText>
      <ThemedSegmentedControl
        values={["Underline 1", "Underline 2", "Underline 3"]}
        selectedIndex={underlineExample}
        onChange={setUnderlineExample}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        animatedSwitch={true}
        selectedIndicator={{
          useUnderline: true,
          underlineThickness: 4,  // try changing to 2 or 6 if you like
          underlineWidth: 50, // or a fixed number
        }}
        style={styles.segmentedControl}
      />
      <ThemedText style={styles.selectedText}>
        Selected: {["Underline 1", "Underline 2", "Underline 3"][underlineExample]}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  segmentedControl: {
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});

export default ThemedSegmentedControlExamples;

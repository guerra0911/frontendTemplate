import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ThemedDateTimeSelector, {
  DateTimePickerType,
} from "@/components/templates/dateTime/ThemedDateTimeSelector";
import { ThemedText } from "@/components/templates/general/ThemedText";

const ThemedDateTimeSelectorExamples: React.FC = () => {
  // Four separate states for demonstration
  const [dateOnly, setDateOnly] = useState(new Date());
  const [timeOnly, setTimeOnly] = useState(new Date());
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 1. DATE ONLY */}
      <ThemedText style={styles.sectionTitle}>Date Only Picker</ThemedText>
      <ThemedDateTimeSelector
        value={dateOnly}
        onChange={setDateOnly}
        pickerType="date"
        displayText="Select Date"
        style={styles.selector}
      />
      <ThemedText style={styles.selectedText}>
        {dateOnly.toDateString()}
      </ThemedText>

      {/* 2. TIME ONLY */}
      <ThemedText style={styles.sectionTitle}>Time Only Picker</ThemedText>
      <ThemedDateTimeSelector
        value={timeOnly}
        onChange={setTimeOnly}
        pickerType="time"
        displayText="Select Time"
        themeType="secondary"
        iconName="clock-o"
        style={styles.selector}
      />
      <ThemedText style={styles.selectedText}>
        {timeOnly.toLocaleTimeString()}
      </ThemedText>

      {/* 3. DATE & TIME */}
      <ThemedText style={styles.sectionTitle}>Date & Time Picker</ThemedText>
      <ThemedDateTimeSelector
        value={dateTime}
        onChange={setDateTime}
        pickerType="datetime"
        displayText="Select Date & Time"
        themeType="tertiary"
        customHeight={60}
        customWidth={250}
        style={styles.selector}
      />
      <ThemedText style={styles.selectedText}>
        {dateTime.toLocaleString()}
      </ThemedText>

    </ScrollView>
  );
};

export default ThemedDateTimeSelectorExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
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
  selector: {
    marginBottom: 15,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#333333",
  },
});

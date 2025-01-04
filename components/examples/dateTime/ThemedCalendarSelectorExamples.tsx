// ThemedCalendarSelectorExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ThemedCalendarSelector from "@/components/templates/dateTime/ThemedCalendarSelector"; 
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";
import { ThemedText } from "@/components/templates/general/ThemedText";

const ThemedCalendarSelectorExamples: React.FC = () => {
  // SINGLE MODE
  const [singleDate, setSingleDate] = useState<DateType | undefined>();
  const [showTimePicker, setShowTimePicker] = useState(false);

  // RANGE MODE
  const [rangeStart, setRangeStart] = useState<DateType | undefined>();
  const [rangeEnd, setRangeEnd] = useState<DateType | undefined>();

  // MULTIPLE MODE
  const [multipleDates, setMultipleDates] = useState<DateType[]>([]);

  // Additional examples with custom container styling
  const [customSingleDate, setCustomSingleDate] = useState<DateType | undefined>();
  const [customRangeStart, setCustomRangeStart] = useState<DateType | undefined>();
  const [customRangeEnd, setCustomRangeEnd] = useState<DateType | undefined>();

  // EXAMPLE: Custom text & separator colors
  const [customTextDate, setCustomTextDate] = useState<DateType | undefined>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title}>ThemedCalendarSelector Examples</ThemedText>

      {/* SINGLE MODE EXAMPLE */}
      <ThemedText style={styles.sectionTitle}>Single Mode (Default)</ThemedText>
      <View style={styles.exampleContainer}>
        <ThemedCalendarSelector
          mode="single"
          date={singleDate}
          onChangeSingle={({ date }) => {
            setSingleDate(date);
          }}
          timePicker={showTimePicker}
          selectedTextStyle={{ fontWeight: "bold", color: "#007AFF" }}
          headerButtonColor="#007AFF"
        />
        <Text style={styles.selectedText}>
          {singleDate
            ? `Selected date: ${dayjs(singleDate).format("YYYY-MM-DD HH:mm")}`
            : "No date selected"}
        </Text>
      </View>

      {/* TIME PICKER TOGGLE */}
      <ThemedText style={{ marginTop: 10 }}>
        Press below to toggle timePicker in Single mode:
      </ThemedText>
      <ThemedCalendarSelector
        mode="single"
        date={singleDate}
        onChangeSingle={({ date }) => {
          setSingleDate(date);
        }}
        timePicker={!showTimePicker} 
        containerStyle={{
          width: 320,
          marginBottom: 20,
        }}
      />
      <Text
        style={[styles.buttonLikeText, { marginBottom: 20 }]}
        onPress={() => setShowTimePicker(!showTimePicker)}
      >
        {showTimePicker ? "Disable Time Picker" : "Enable Time Picker"}
      </Text>

      {/* RANGE MODE EXAMPLE */}
      <ThemedText style={styles.sectionTitle}>Range Mode (Default)</ThemedText>
      <View style={styles.exampleContainer}>
        <ThemedCalendarSelector
          mode="range"
          startDate={rangeStart}
          endDate={rangeEnd}
          onChangeRange={({ startDate, endDate }) => {
            setRangeStart(startDate);
            setRangeEnd(endDate);
          }}
          selectedRangeBackgroundColor="#FFCC00" // highlight color
        />
        <Text style={styles.selectedText}>
          {rangeStart
            ? `Start: ${dayjs(rangeStart).format("YYYY-MM-DD")}`
            : "Start: ---"}{" "}
          |{" "}
          {rangeEnd
            ? `End: ${dayjs(rangeEnd).format("YYYY-MM-DD")}`
            : "End: ---"}
        </Text>
      </View>

      {/* MULTIPLE MODE EXAMPLE */}
      <ThemedText style={styles.sectionTitle}>Multiple Mode (Default)</ThemedText>
      <View style={styles.exampleContainer}>
        <ThemedCalendarSelector
          mode="multiple"
          dates={multipleDates}
          onChangeMultiple={({ dates }) => {
            setMultipleDates(dates);
          }}
        />
        <Text style={styles.selectedText}>
          {multipleDates && multipleDates.length > 0
            ? `Selected: ${multipleDates
                .map((d) => dayjs(d).format("MM-DD"))
                .join(", ")}`
            : "No dates selected"}
        </Text>
      </View>

      {/* CUSTOM STYLES EXAMPLE - SINGLE MODE */}
      <ThemedText style={styles.sectionTitle}>Single Mode with Custom Container</ThemedText>
      <ThemedCalendarSelector
        mode="single"
        date={customSingleDate}
        onChangeSingle={({ date }) => setCustomSingleDate(date)}
        themeType="secondary" 
        showContainerBorder={true}
        showContainerShadow={true}
        containerBorderWidth={2}
        containerBorderRadius={12}
        backgroundColor={{ light: "#F0F8FF", dark: "#333333" }}
        selectedTextStyle={{ fontWeight: "700", color: "#34C759" }}
        containerStyle={{ marginBottom: 10 }}
      />
      <Text style={styles.selectedText}>
        {customSingleDate
          ? `Selected date: ${dayjs(customSingleDate).format("YYYY-MM-DD")}`
          : "No date selected"}
      </Text>

      {/* CUSTOM STYLES EXAMPLE - RANGE MODE */}
      <ThemedText style={styles.sectionTitle}>Range Mode with Custom Container</ThemedText>
      <ThemedCalendarSelector
        mode="range"
        startDate={customRangeStart}
        endDate={customRangeEnd}
        onChangeRange={({ startDate, endDate }) => {
          setCustomRangeStart(startDate);
          setCustomRangeEnd(endDate);
        }}
        themeType="tertiary"
        showContainerShadow={true}
        containerBorderRadius={16}
        selectedItemColor="#FF6347"
        selectedTextStyle={{ fontWeight: "600", color: "#FF6347" }}
        containerStyle={{
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Text style={styles.selectedText}>
        {customRangeStart
          ? `Start: ${dayjs(customRangeStart).format("YYYY-MM-DD")}`
          : "Start: ---"}{" "}
        |{" "}
        {customRangeEnd
          ? `End: ${dayjs(customRangeEnd).format("YYYY-MM-DD")}`
          : "End: ---"}
      </Text>

      {/* CUSTOM TEXT & SEPARATOR COLORS EXAMPLE */}
      <ThemedText style={styles.sectionTitle}>
        Custom Text & Separator Colors (Primary Theme)
      </ThemedText>
      <ThemedCalendarSelector
        mode="single"
        date={customTextDate}
        onChangeSingle={({ date }) => setCustomTextDate(date)}
        themeType="primary"
        textColor={{ light: "#E63757", dark: "#F5A623" }} // light=red, dark=orange
        separatorColor={{ light: "#6ad3df", dark: "#9e7bb5" }} // light=teal, dark=purple
        containerStyle={{ marginBottom: 40, width: 320 }}
      />
      <Text style={styles.selectedText}>
        {customTextDate
          ? `Selected date: ${dayjs(customTextDate).format("YYYY-MM-DD")}`
          : "No date selected"}
      </Text>
    </ScrollView>
  );
};

export default ThemedCalendarSelectorExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  exampleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  selectedText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
  },
  buttonLikeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

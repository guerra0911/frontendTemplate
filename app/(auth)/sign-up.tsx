import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import FormField from "@/components/forms/FormField";
import { registerUser } from "@/services/authServices";
import { validateEmail, validatePassword, validateUsername } from "@/utils/validation";
import { ThemedText } from "@/components/templates/general/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";

import SignUpButton from "@/components/buttons/SignUpButton";
import ThemedTextButton from "@/components/templates/buttons/ThemedTextButton";

// NEW IMPORT
import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate user data
    if (!validateUsername(username)) {
      Alert.alert(
        "Error",
        "Username must be between 1 and 25 characters and can only contain letters, numbers, periods, and underscores."
      );
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters long and contain at least one number."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const message = await registerUser(
        username.trim(),
        password.trim(),
        confirmPassword.trim(),
        email.trim()
      );
      Alert.alert("Registration Success", message || "Account created!");
      router.replace("/sign-in");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "An error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedScrollContainer isScrollable={false} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ThemedView
            style={{
              paddingHorizontal: 24,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <ThemedText type="title" style={{ marginBottom: 12 }}>
              Sign Up
            </ThemedText>

            <FormField
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            <FormField
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />

            {/* Center the button */}
            <ThemedView style={{ marginTop: 24, alignItems: "center" }}>
              <SignUpButton isLoading={isLoading} onPress={handleSubmit} />
            </ThemedView>

            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <ThemedText style={{ marginRight: 5, lineHeight: 30 }}>
                Already have an account?
              </ThemedText>
              <ThemedTextButton
                onPress={() => router.replace("/sign-in")}
                themeType="secondary"
                style={{ lineHeight: 30 }}
              >
                Sign In
              </ThemedTextButton>
            </ThemedView>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedScrollContainer>
  );
};

export default SignUpScreen;

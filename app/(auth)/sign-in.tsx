import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useGlobalContext } from "@/contexts/GlobalProvider";
import { loginUser } from "@/services/authServices";
import FormField from "@/components/forms/FormField";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";

import SignInButton from "@/components/buttons/SignInButton";
import ThemedTextButton from "@/components/templates/buttons/ThemedTextButton";

// NEW IMPORT
import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";

const SignInScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogged, checkCurrentUser } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await loginUser(username.trim(), password.trim());
      await checkCurrentUser();
      setIsLogged(true);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.detail || "Invalid credentials"
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
              Log in to Your App
            </ThemedText>

            <FormField
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />

            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />

            {/* Center the button */}
            <ThemedView style={{ marginTop: 24, alignItems: "center" }}>
              <SignInButton isLoading={isLoading} onPress={handleSubmit} />
            </ThemedView>

            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <ThemedText style={{ marginRight: 5, lineHeight: 30 }}>
                Don't have an account?
              </ThemedText>

              <ThemedTextButton
                onPress={() => router.replace("/sign-up")}
                themeType="secondary"
                style={{ lineHeight: 30 }}
              >
                Sign Up
              </ThemedTextButton>
            </ThemedView>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedScrollContainer>
  );
};

export default SignInScreen;

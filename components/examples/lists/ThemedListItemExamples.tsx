/**
 * ThemedListItemExamples.tsx
 *
 * Mirrors the example usage from RNP's ListItemExample, but using ThemedList
 * components and correctly implementing ThemedToggleSwitch.
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedListItem from "@/components/templates/lists/ThemedListItem";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import ThemedAvatar from "@/components/templates/avatars/ThemedAvatar";
import ThemedToggleSwitch from "@/components/templates/buttons/ThemedToggleSwitch";
import ThemedCheckBox from "@/components/templates/buttons/ThemedCheckBox"; // if available
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedListIcon from "@/components/templates/lists/ThemedListIcon";
import ThemedListImage from "@/components/templates/lists/ThemedListImage";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import ThemedActivityIndicator from "@/components/templates/loaders/ThemedActivityIndicator";
import ThemedCardContent from "@/components/templates/cards/ThemedCardContent";
import ThemedCardTitle from "@/components/templates/cards/ThemedCardTitle";
// We'll mock a "CenteredCheckbox" component using ThemedCheckBox for demonstration
function CenteredCheckbox() {
  return (
    <View style={styles.centered}>
      <ThemedCheckBox
        value={true}
        onValueChange={() => {}}
        style={styles.centered}
      />
    </View>
  );
}

export default function ThemedListItemExamples() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">ThemedListItem Examples</ThemedText>

      <ThemedText type="subtitle">Text-only items</ThemedText>
      <ThemedListItem title="Headline" />
      <ThemedListItem title="Headline" description="Supporting text" />
      <ThemedListItem
        title="Headline"
        description="A very long supporting text that might wrap into multiple lines..."
      />
      <ThemedDivider />

      <ThemedListItem title="Headline" right={() => <CenteredCheckbox />} />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        right={() => <CenteredCheckbox />}
      />
      <ThemedListItem
        title="Headline"
        description="Multi-line supporting text"
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With icon</ThemedText>
      <ThemedListItem
        title="Headline"
        left={(props) => (
          <ThemedListIcon icon="person-circle-outline" color={props.color} />
        )}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={(props) => (
          <ThemedListIcon icon="person-circle-outline" color={props.color} />
        )}
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With avatar</ThemedText>
      <ThemedListItem
        title="Headline"
        left={() => <ThemedAvatar.Text label="A" size={40} />}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={() => <ThemedAvatar.Text label="A" size={40} />}
      />
      <ThemedListItem
        title="Headline"
        description="Multi-line text..."
        left={() => <ThemedAvatar.Text label="A" size={40} />}
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With image</ThemedText>
      <ThemedListItem
        title="Headline"
        left={() => (
          <ThemedListImage source={{ uri: "https://picsum.photos/100" }} />
        )}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={() => (
          <ThemedListImage source={{ uri: "https://picsum.photos/200" }} />
        )}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With switch (ToggleSwitch)</ThemedText>
      <ThemedListItem
        title="Headline"
        right={() => (
          <ThemedToggleSwitch value={true} onValueChange={() => {}} />
        )}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        right={() => (
          <ThemedToggleSwitch value={false} onValueChange={() => {}} />
        )}
      />

      <ThemedDivider />

      {/* NEW SUBSECTION: Custom dimension items */}
      <ThemedText type="subtitle">Custom dimension items</ThemedText>
      <ThemedListItem
        title="Small height, wide width"
        description="This list item is 50 in height, 300 in width"
        height={50}
        width={300}
      />
      <ThemedListItem
        title="Large height, narrower width"
        description="This list item is 100 in height, 200 in width"
        height={100}
        width={200}
        right={() => <CenteredCheckbox />}
      />

      {/* NEW EXAMPLES: Custom spacing & alignment */}
      <ThemedText type="subtitle">Custom Spacing & Alignment</ThemedText>

      <ThemedListItem
        title="Left -> Content spacing 30"
        description="Content -> Right spacing 10"
        leftToContentSpacing={30}
        contentToRightSpacing={10}
        left={(props) => (
          <ThemedListIcon icon="people-circle-sharp" color={props.color} />
        )}
        right={() => <CenteredCheckbox />}
      />

      <ThemedListItem
        title="All text center aligned"
        description="No left, no right, text centered"
        contentAlignment="center"
      />

      <ThemedListItem
        title="All text right aligned"
        description="Left component only, with big spacing to content"
        leftToContentSpacing={40}
        contentAlignment="right"
        left={(props) => <ThemedListIcon icon="star" color={props.color} />}
      />

      <ThemedListItem
        title="No left/right, custom size + centered text"
        description="width=250, height=60"
        width={350}
        height={60}
        contentAlignment="center"
      />

      <ThemedText type="subtitle">Disable Ripple Examples</ThemedText>
      <ThemedListItem
        title="No ripple effect"
        description="disableRippleEffect={true}"
        disableRippleEffect
      />
      <ThemedListItem
        title="Pressable with no ripple"
        description="Still calls onPress but no visual effect"
        disableRippleEffect
        onPress={() => console.log("Pressed item w/o ripple")}
      />

      <ThemedDivider />
      <ThemedText type="subtitle">Arbitrary children demonstration</ThemedText>

      {/* 1) ThemedCard in middle */}
      <ThemedListItem
        title="Title is still rendered"
        description="But we also put a ThemedCard below the description"
        middleChildren={
          <View style={{ marginTop: 8 }}>
            <ThemedCard style={{ padding: 10 }}>
              <ThemedCardTitle title="I'm a ThemedCard in a list item!" />
              <ThemedCardContent>
                <ThemedText>Nested inside middleChildren</ThemedText>
              </ThemedCardContent>
            </ThemedCard>
          </View>
        }
      />

      {/* 2) ThemedActivityIndicator on the right + ThemedCard on leftChildren */}
      <ThemedListItem
        title="Mixed children"
        leftChildren={
          <ThemedCard style={{ width: 80, height: 60 }}>
            <ThemedCardContent>
              <ThemedText>Left Card</ThemedText>
            </ThemedCardContent>
          </ThemedCard>
        }
        rightChildren={
          <ThemedActivityIndicator size={24} themeType="secondary" animating />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    alignSelf: "center",
  },
});

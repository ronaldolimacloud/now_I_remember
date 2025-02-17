// Import necessary components from react-native.
// - Image: to display images in our app.
// - StyleSheet: to create styling for our components.
// - Platform: to determine the current platform (iOS, Android, or web).
import { Image, StyleSheet, Platform } from 'react-native';

// Import a custom component that displays an animated "wave" effect.
import { HelloWave } from '@/components/HelloWave';

// Import a special scroll view component that adds a parallax effect to the header.
// A parallax effect makes the header image move at a different speed than the content when scrolling.
import ParallaxScrollView from '@/components/ParallaxScrollView';

// Import text and view components that automatically adjust appearance based on the current theme (light or dark).
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define and export the HomeScreen component.
// This is the main screen shown under the Home tab.
export default function HomeScreen() {
  return (
    // ParallaxScrollView provides a scrolling view with a header that has a parallax effect.
    <ParallaxScrollView
      // Set the header background colors for light and dark themes.
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      // Define the header image using an Image component.
      // The image source is loaded from the assets folder and styled using the styles defined below.
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* ThemedView acts as a container that adapts its style based on the current theme.
          Here, it holds the title text and a decorative "HelloWave" component. */}
      <ThemedView style={styles.titleContainer}>
        {/* ThemedText displays the text 'Welcome CACETA' using a style preset for titles. */}
        <ThemedText type="title">Welcome CACETA</ThemedText>
        {/* Include the HelloWave component to add a fun animated wave effect next to the title. */}
        <HelloWave />
      </ThemedView>
      {/* Each ThemedView here wraps a section with instructions for the user. */}
      <ThemedView style={styles.stepContainer}>
        {/* Subtitle for the first step. */}
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        {/* Descriptive text for the first step.
            It tells you which file to edit and how to open developer tools depending on your platform. */}
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* Subtitle for the second step. */}
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        {/* Descriptive text for the second step.
            It encourages you to navigate to the Explore tab to learn more about the app features. */}
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* Subtitle for the third step. */}
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        {/* Descriptive text for the third step.
            It suggests running a command to reset the project, which moves the current app folder to a backup folder. */}
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Define our component styles using StyleSheet.create.
const styles = StyleSheet.create({
  // Style for the title container.
  // It lays out the title text and the HelloWave component horizontally with a gap between them.
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Style for each step container.
  // Adds spacing between lines of instructions and a margin at the bottom.
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  // Style for the React logo image used in the parallax header.
  // It defines the size and positions the image at the bottom left.
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

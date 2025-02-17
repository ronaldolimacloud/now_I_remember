// Import navigation themes and theming provider from React Navigation.
// DarkTheme and DefaultTheme are built-in color schemes, and ThemeProvider allows applying a theme throughout the navigation structure.
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// Import the useFonts hook from Expo Font to load custom fonts.
import { useFonts } from 'expo-font';

// Import the Stack component from Expo Router to create a stack-based navigation layout.
import { Stack } from 'expo-router';

// Import SplashScreen from Expo to control when the splash screen is hidden.
import * as SplashScreen from 'expo-splash-screen';

// Import the StatusBar component from Expo to manage the appearance of the status bar (the bar at the top of your device's screen).
import { StatusBar } from 'expo-status-bar';

// Import the useEffect hook from React to run side effects after rendering.
import { useEffect } from 'react';

// Import basic UI components from React Native:
// - Button: a pressable button.
// - View: a container for layout.
// - StyleSheet: a helper to create styles.
import { Button, View, StyleSheet } from 'react-native';

// Import Amplify from AWS Amplify for configuring AWS services in your app.
import { Amplify } from 'aws-amplify';

// Import Authenticator and useAuthenticator from AWS Amplify's UI library to manage user authentication processes.
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

// Import a custom hook to determine whether the device is using dark mode or light mode.
import { useColorScheme } from '@/hooks/useColorScheme';

// Import React in order to create and use React components with JSX.
import React from 'react';

// Import the AWS Amplify configuration outputs from a local JSON file.
import outputs from '../amplify_outputs.json';

// Import Redirect from Expo Router to navigate users to another screen if needed.
import { Redirect } from 'expo-router';


// This line stops the splash screen from automatically hiding.
// We want to keep the splash screen visible until our assets (like custom fonts) are fully loaded.
SplashScreen.preventAutoHideAsync();

// Set up AWS Amplify with configuration details provided in the outputs JSON file.
// This connects our app with the proper AWS services.
Amplify.configure(outputs);


// Create a SignOutButton component that provides a way for users to sign out.
// It utilizes the signOut function from the Authenticator context.
const SignOutButton = () => {
  // Retrieve the signOut method from useAuthenticator to handle the sign-out action.
  const { signOut } = useAuthenticator();

  // Render a View containing a Button. When the button is pressed, it will sign the user out.
  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};


// Create the AuthenticatedApp component which represents the main part of the app
// that authenticated users will see.
const AuthenticatedApp = ({ colorScheme }: { colorScheme: string }): React.ReactElement => {
  // Retrieve the authenticated user information using useAuthenticator.
  const { user } = useAuthenticator();

  // If there is no authenticated user, redirect to the sign-in page.
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Render the main app layout for signed-in users.
  return (
    <View style={{ flex: 1 }}>
      {/* Render the sign-out button so the user can log out whenever they want. */}
      <SignOutButton />
      {/* Set up navigation using a stack. This means screens will be managed in a stack structure (like pages on top of each other). */}
      <Stack>
        {/* Main tabs screen that shows the bottom tab navigation. The header is hidden. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Authentication-related screens (if needed) are also included without a header. */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* A fallback screen for unmatched routes, with a title of "Oops!" */}
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      {/* Set the style of the status bar based on the current color scheme.
          It uses a light style for dark mode and a dark style for light mode. */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
};


// Define the RootLayout component which is the main entry point for setting up themes, fonts, and authentication.
export default function RootLayout() {
  // Determine the current color scheme ('dark' or 'light') using our custom hook.
  const colorScheme = useColorScheme();
  // If the color scheme is undefined, default to 'light'.
  const effectiveColorScheme = colorScheme || 'light';

  // Load custom fonts (here, SpaceMono) using the useFonts hook.
  // The loaded variable becomes true when the font is successfully loaded.
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Once the fonts have loaded, use the useEffect hook to hide the splash screen.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // If the fonts haven't finished loading, don't render anything (return null).
  if (!loaded) {
    return null;
  }

  // Render the app with theming and authentication contexts applied.
  return (
    // ThemeProvider applies either the DarkTheme or DefaultTheme to all navigation elements.
    <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* The Authenticator.Provider component supplies authentication state to all its children. */}
      <Authenticator.Provider>
        {/* Authenticator handles the UI for user sign-in, sign-up, and similar flows before rendering the app.
            Once authenticated, the AuthenticatedApp component is displayed. */}
        <Authenticator>
          <AuthenticatedApp colorScheme={effectiveColorScheme} />
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}


// Define styles for components in this file using StyleSheet.
// It helps organize and standardize styling across the component.
const styles = StyleSheet.create({
  // This style aligns the sign-out button to the end of its container,
  // placing it on the far right in standard left-to-right layouts.
  signOutButton: {
    alignSelf: 'flex-end',
  },
});

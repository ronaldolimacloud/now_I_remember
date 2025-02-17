// Import the Authenticator component from AWS Amplify's UI library for React Native.
// This component provides a ready-made user authentication interface (such as sign in, sign up, and password recovery).
import { Authenticator } from '@aws-amplify/ui-react-native';

// Import the View component from React Native.
// View works like a container or box and is used to layout other components on the screen.
import { View } from 'react-native';

// Import a custom hook named useColorScheme.
// This hook checks if the device is using a dark mode or light mode, which helps to set the correct background color.
import { useColorScheme } from '@/hooks/useColorScheme';

// Import the Redirect component from Expo Router.
// Redirect lets the app automatically navigate to another screen when needed.
import { Redirect } from 'expo-router';

// Import React so we can use React's features to create components.
import React from 'react';

// Define a functional component called SignIn.
// This component is responsible for showing the sign-in interface and handling user authentication.
export default function SignIn() {
  // Use the custom useColorScheme hook to get the current color mode ('dark' or 'light').
  // The result will be used to determine the background color of our app.
  const colorScheme = useColorScheme();

  // The component returns a user interface.
  // We wrap everything inside a View component to define the layout and apply styling.
  return (
    // The View component acts as a container that fills the entire screen (flex: 1).
    // It sets its background color to black if the device is in dark mode, or white if in light mode.
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      {/*
        The Authenticator component comes from AWS Amplify.
        It handles the authentication flow (like signing in or signing up) without needing extra code.
      */}
      <Authenticator>
        {(props: { user: Record<string, any> }) => {
          // The function passed as a child to the Authenticator is called once the user has been authenticated.
          // 'props' contains information about the authenticated user.
          // Once the user is signed in, we use the Redirect component to navigate them to the main tabs screen.
          return <Redirect href="/(tabs)" />;
        }}
      </Authenticator>
    </View>
  );
} 
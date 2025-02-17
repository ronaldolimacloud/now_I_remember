// Import necessary components and hooks
// Authenticator is AWS Amplify's pre-built authentication UI component
import { Authenticator } from '@aws-amplify/ui-react-native';
// View is a basic container component from React Native, similar to a <div> in web
import { View } from 'react-native';
// Custom hook to detect if the user's device is in dark or light mode
import { useColorScheme } from '@/hooks/useColorScheme';
// Redirect is used for navigation - it will automatically redirect users to another screen
import { Redirect } from 'expo-router';
import React from 'react';

// Define the main SignIn component
export default function SignIn() {
  // Get the current color scheme (dark or light mode) from the user's device
  // This will be used to set appropriate background colors
  const colorScheme = useColorScheme();

  return (
    // Main container View
    // The style object sets:
    // - flex: 1 (takes up all available space)
    // - backgroundColor: changes based on dark/light mode
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      {/* 
        Authenticator component from AWS Amplify:
        - Provides a complete authentication UI out of the box
        - Handles sign-in, sign-up, forgot password, etc.
        - Manages the authentication state
      */}
      <Authenticator>
        {/* 
          This is a render prop function that gets called when authentication is successful
          - It receives the user object containing the authenticated user's information
          - The Record<string, any> type means user is an object with string keys and any values
        */}
        {(props: { user: Record<string, any> }) => {
          // When user is authenticated, redirect them to the main app tabs
          // The '/(tabs)' route is defined in your app's tab navigation
          return <Redirect href="/(tabs)" />;
        }}
      </Authenticator>
    </View>
  );
} 
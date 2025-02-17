// Import the Stack component from the 'expo-router' package.
// The Stack component helps us create a navigation structure where screens are placed on top of each other.
import { Stack } from 'expo-router';

// Import React so that we can use JSX syntax (which looks like HTML in our JavaScript/TypeScript).
import React from 'react';

// Create a functional component called AuthLayout.
// This component defines the layout for our authentication screens.
export default function AuthLayout() {
  // Return the UI components wrapped inside a Stack.
  // The Stack here allows us to define different screens for the authentication flow.
  return (
    // We configure the Stack so that its screens do not show a header (i.e., top bar) by default.
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define the sign-in screen.
          This screen will be shown when the user navigates to the "sign-in" route. */}
      <Stack.Screen name="sign-in" />
      
      {/* Define the sign-up screen.
          This screen will be shown when users want to create a new account. */}
      <Stack.Screen name="sign-up" />
      
      {/* Define the forgot-password screen.
          This screen will help users recover their account if they forget their password. */}
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
} 
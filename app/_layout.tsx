import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import outputs from '../amplify_outputs.json';
import { Redirect } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Initialize Amplify with the configuration from amplify_outputs.json
Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();
  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const AuthenticatedApp = ({ colorScheme }: { colorScheme: string }): React.ReactElement => {
  const { user } = useAuthenticator();
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <SignOutButton />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const effectiveColorScheme = colorScheme || 'light';
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Authenticator.Provider>
        <Authenticator>
          <AuthenticatedApp colorScheme={effectiveColorScheme} />
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: 'flex-end',
  },
});

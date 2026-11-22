// D:\Work\R6\little-lemon\App.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { lightColors, darkColors } from './theme/palette';
import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default function App() {
  const [demoEmail, setDemoEmail] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <LittleLemonHeader colors={colors} />

          <KeyboardAvoidingView
              style={styles.content}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.content}>
              {demoEmail === null ? (
                  <LoginScreen colors={colors} onContinue={setDemoEmail} />
              ) : (
                  <WelcomeScreen
                      colors={colors}
                      email={demoEmail}
                      onExit={() => setDemoEmail(null)}
                  />
              )}
            </View>
          </KeyboardAvoidingView>

          <LittleLemonFooter colors={colors} />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
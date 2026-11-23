// D:\Work\R6\little-lemon\App.tsx
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Імпортуємо всі потоки навігації. 
// Ті, що зараз не використовуються в ActiveNavigator, ми коментуємо, 
// щоб суворий ESLint та TypeScript (TS6133) не видавали помилок.
//import StackFlow from './navigation/StackFlow';
//import TabsFlow from './navigation/TabsFlow';
 import DrawerFlow from './navigation/DrawerFlow';

// Змінюйте цю константу для тестування різних варіантів навігації.
const ActiveNavigator = DrawerFlow;

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (

      <GestureHandlerRootView style={styles.gestureRoot}>
        <SafeAreaProvider>
          <StatusBar style={isDark ? 'light' : 'dark'} />

          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            {/* ActiveNavigator бере на себе всю логіку перемикання екранів,
              замінюючи стару логіку з demoEmail */}
            <ActiveNavigator />
          </NavigationContainer>

        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,

  },
});
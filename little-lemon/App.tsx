import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import StackFlow from './navigation/StackFlow';
// import TabsFlow from './navigation/TabsFlow';
// import DrawerFlow from './navigation/DrawerFlow';

const ActiveNavigator = StackFlow;

export default function App() {
    const isDark = useColorScheme() === 'dark';

    return (
        <GestureHandlerRootView style={styles.gestureRoot}>
            <SafeAreaProvider>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
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
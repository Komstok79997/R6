import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RemoteMenuScreen from '../screens/RemoteMenuScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import { useAppColors } from '../theme/useAppColors';
import type { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

type StackNavigation = NativeStackNavigationProp<StackParamList>;
type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;
type WelcomeProps = NativeStackScreenProps<StackParamList, 'Welcome'>;

function WelcomeHeaderRight() {
    const navigation = useNavigation<StackNavigation>();
    return (
        <Button
            title="Меню"
            onPress={() => navigation.navigate('RemoteMenu')}
        />
    );
}

function LoginRoute({ navigation }: LoginProps) {
    const colors = useAppColors();
    return (
        <LoginScreen
            colors={colors}
            onContinue={(email) => navigation.navigate('Welcome', { email })}
        />
    );
}

function WelcomeRoute({ navigation, route }: WelcomeProps) {
    const colors = useAppColors();
    return (
        <WelcomeScreen
            colors={colors}
            email={route.params.email}
            onExit={() => navigation.goBack()}
            onOpenPreferences={() => navigation.navigate('Preferences')}
        />
    );
}

export default function StackFlow() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginRoute}
                options={{ title: 'Навчальна форма' }}
            />
            <Stack.Screen
                name="Welcome"
                component={WelcomeRoute}
                options={{
                    title: 'Привітання',
                    headerRight: WelcomeHeaderRight,
                }}
            />
            <Stack.Screen
                name="RemoteMenu"
                component={RemoteMenuScreen}
                options={{ title: 'Меню Little Lemon' }}
            />
            <Stack.Screen
                name="Preferences"
                component={PreferencesScreen}
                options={{ title: 'Налаштування' }}
            />
        </Stack.Navigator>
    );
}
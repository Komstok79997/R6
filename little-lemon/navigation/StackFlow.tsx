import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RemoteMenuScreen from '../screens/RemoteMenuScreen';
import { useAppColors } from '../theme/useAppColors';
import type { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;
type WelcomeProps = NativeStackScreenProps<StackParamList, 'Welcome'>;

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
                options={({ navigation }) => ({
                    title: 'Привітання',
                    headerRight: () => (
                        <Button title="Меню" onPress={() => navigation.navigate('RemoteMenu')} />
                    ),
                })}
            />
            <Stack.Screen
                name="RemoteMenu"
                component={RemoteMenuScreen}
                options={{ title: 'Меню Little Lemon' }}
            />
        </Stack.Navigator>
    );
}
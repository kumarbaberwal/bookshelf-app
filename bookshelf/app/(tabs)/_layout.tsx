import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                headerShadowVisible: false,
                tabBarLabelStyle: {
                    color: colors.textPrimary,
                    fontWeight: '600',
                },
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingTop: 5,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                }
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'home-outline'} size={size} color={color} />
                    )
                }}
            // options={{ tabBarIcon: <Ionicons name={'home'} size={30} color={colors.primary} /> }}
            />
            <Tabs.Screen
                name={'create'}
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'add-circle-outline'} size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name={'profile'}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'person-outline'} size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}
import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'

export default function Loader({ size = 'large' }: {
    size?: number | 'large' | 'small',
}) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
            }}
        >
            <ActivityIndicator
                size={size}
                color={colors.primary}
            />
        </View>
    )
}
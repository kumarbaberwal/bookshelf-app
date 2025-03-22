import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore'

export default function Profile() {
  const { logout } = useAuthStore();
  return (
    <View>
      <TouchableOpacity
        onPress={logout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
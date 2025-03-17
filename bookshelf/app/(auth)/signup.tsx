import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/signup.styles'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors'
import { useRouter } from 'expo-router'

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => { }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={styles.container}
      >
        <View
          style={styles.card}
        >
          <View
            style={styles.header}
          >
            <Text
              style={styles.title}
            >
              BookShelf 📚
            </Text>
            <Text
              style={styles.subtitle}
            >
              Place your favourite reads
            </Text>
          </View>
          <View
            style={styles.formContainer}
          >
            {/* User Name Input */}
            <View
              style={styles.inputGroup}
            >
              <Text
                style={styles.label}
              >
                Username
              </Text>
              <View
                style={styles.inputContainer}
              >
                <Ionicons
                  name={'person-outline'}
                  size={20}
                  color={colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Kumar'
                  placeholderTextColor={colors.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize={'none'}
                />
              </View>
            </View>

            {/* Email Input */}
            <View
              style={styles.inputGroup}
            >
              <Text
                style={styles.label}
              >
                Email
              </Text>
              <View
                style={styles.inputContainer}
              >
                <Ionicons
                  name={'mail-outline'}
                  size={20}
                  color={colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='kumar@gmail.com'
                  placeholderTextColor={colors.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                />
              </View>
            </View>


            {/* Password Input */}
            <View
              style={styles.inputGroup}
            >
              <Text
                style={styles.label}
              >
                Username
              </Text>
              <View
                style={styles.inputContainer}
              >
                <Ionicons
                  name={'lock-closed-outline'}
                  size={20}
                  color={colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='******'
                  placeholderTextColor={colors.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.primary}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Signup Button */}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={'#fff'}
                  />
                ) : (
                  <Text
                    style={styles.buttonText}
                  >
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>

              {/* Footer */}

              <View
                style={styles.footer}
              >
                <Text
                  style={styles.footerText}
                >
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => router.back()}
                >
                  <Text
                    style={styles.link}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
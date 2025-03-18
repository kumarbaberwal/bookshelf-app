import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/login.styles'
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    fetch('http://localhost:3000/auth/login', {
      
    })
  }


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
          style={styles.topIllustration}
        >
          <Image
            source={require('@/assets/images/i.png')}
            style={styles.illustrationImage}
            resizeMode={'cover'}
          />
        </View>


        <View
          style={styles.card}
        >
          <View
            style={styles.formContainer}
          >
            {/* Email */}
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
                  placeholder='Enter your Email'
                  placeholderTextColor={colors.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                />
              </View>
            </View>

            {/* Password */}
            <View
              style={styles.inputGroup}
            >
              <Text
                style={styles.label}
              >
                Password
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
                  placeholder='Enter your password'
                  placeholderTextColor={colors.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  // keyboardType={'default'}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>


            {/* Login Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
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
                  Login
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
                Don't have an account?
              </Text>
              <Link
                href={'/(auth)/signup'}
                asChild
              >
                <TouchableOpacity>
                  <Text
                    style={styles.link}

                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
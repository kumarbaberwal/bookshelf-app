import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import { styles } from '@/assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/constants/api';

export default function Create() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const router = useRouter();

  const pickImage = async () => {
    try {
      // request permission to access camera roll
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          ToastAndroid.show('Sorry, we need camera roll permissions to make this work!', ToastAndroid.SHORT);
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3], // 4:3 aspect ratio
        quality: 0.5, // 1 is max quality
        base64: true, // return base64 encoded image
      });


      if (!result.canceled) {
        // console.log('Result: ', result);
        setImage(result.assets[0].uri);
        // console.log(setImage);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
          // console.log("Image Base64: ", result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64
          });

          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.log("Error picking image: ", error);
      ToastAndroid.show('An error occurred while picking image', ToastAndroid.SHORT);
    }
  }

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    if (!image) {
      ToastAndroid.show("Invalid image", ToastAndroid.SHORT);
      return;
    }

    // console.log("Title: ", title);
    // console.log("Caption: ", caption);
    // console.log("Rating: ", rating);
    // console.log("Image: ", image);
    // console.log("Image Base64: ", imageBase64);
    // console.log("Token: ", token);
    // console.log("Api Url: ", API_URL);


    try {
      setLoading(true);
      // get file extension from uri or default to jpeg
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1]; // get file extension
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : 'image/jpeg'; // default to jpeg
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      // console.log("Image Data Url: ", imageDataUrl);

      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        })
      })

      // console.log("Data: ", response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      ToastAndroid.show('Your book recommendation has been posted', ToastAndroid.SHORT);
      setTitle('')
      setCaption('')
      setRating(3)
      setImage(null)
      setImageBase64(null)

      router.push('/')

    } catch (error) {
      console.log("Error creating post: ", error)
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setLoading(false)
    }
  }


  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >

          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={32}
            color={i <= rating ? "#f4b400" : colors.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={styles.ratingContainer}
      >
        {stars}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View
          style={styles.card}
        >
          {/* Header */}
          <View
            style={styles.header}
          >
            <Text
              style={styles.title}
            >
              Add Book Recommendation
            </Text>
            <Text
              style={styles.subtitle}
            >
              Share your favorite books with others
            </Text>
          </View>


          {/* Form */}
          <View
            style={styles.form}
          >
            {/* Book Title */}
            <View
              style={styles.formGroup}
            >
              <Text
                style={styles.label}
              >
                Book Title
              </Text>
              <View
                style={styles.inputContainer}
              >
                <Ionicons
                  name={'book-outline'}
                  size={20}
                  color={colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter book title'
                  placeholderTextColor={colors.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Rating */}
            <View
              style={styles.formGroup}
            >
              <Text
                style={styles.label}
              >
                Your Rating
              </Text>
              {renderRatingPicker()}
            </View>


            {/* Image */}
            <View
              style={styles.formGroup}
            >
              <Text
                style={styles.label}
              >
                Book Image
              </Text>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={pickImage}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                  />
                ) : (
                  <View
                    style={styles.placeholderContainer}
                  >
                    <Ionicons
                      name='image-outline'
                      size={40}
                      color={colors.textSecondary}
                    />
                    <Text
                      style={styles.placeholderText}
                    >
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>


            {/* Caption */}
            <View
              style={styles.formGroup}
            >
              <Text
                style={styles.label}
              >
                Caption
              </Text>
              <TextInput
                style={styles.textArea}
                placeholder='Write your review or thoughts about this book...'
                placeholderTextColor={colors.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {
                loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <>
                    <Ionicons
                      name={'cloud-upload-outline'}
                      size={20}
                      color={colors.white}
                      style={styles.buttonIcon}
                    />
                    <Text
                      style={styles.buttonText}
                    >
                      Share
                    </Text>
                  </>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
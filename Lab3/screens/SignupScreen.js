// import React, { useState } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Formik } from 'formik';
// import auth from '@react-native-firebase/auth';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { TextInput, Button, FormErrorMessage } from '../components';
// import { Colors } from '../config';
// import { useTogglePasswordVisibility } from '../hooks';
// import { signupValidationSchema } from '../utils';

// export const SignupScreen = () => {
//   const [errorState, setErrorState] = useState('');
//   const {
//     passwordVisibility,
//     handlePasswordVisibility,
//     rightIcon,
//     handleConfirmPasswordVisibility,
//     confirmPasswordIcon,
//     confirmPasswordVisibility,
//   } = useTogglePasswordVisibility();

//   const handleSignup = async values => {
//     const { email, password } = values;
//     try {
//       await auth().createUserWithEmailAndPassword(email, password);
//     } catch (error) {
//       setErrorState(error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <KeyboardAwareScrollView enableOnAndroid={true}>
//         <View style={styles.logoContainer}>
//           <Text style={styles.screenTitle}>Create a new account!</Text>
//         </View>
//         <Formik
//           initialValues={{
//             email: '',
//             password: '',
//             confirmPassword: '',
//           }}
//           validationSchema={signupValidationSchema}
//           onSubmit={values => handleSignup(values)}
//         >
//           {({
//             values,
//             touched,
//             errors,
//             handleChange,
//             handleSubmit,
//             handleBlur,
//           }) => (
//             <>
//               <TextInput
//                 name="email"
//                 placeholder="Enter email"
//                 keyboardType="email-address"
//                 textContentType="emailAddress"
//                 autoFocus={true}
//                 value={values.email}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//               />
//               <FormErrorMessage error={errors.email} visible={touched.email} />
//               <TextInput
//                 name="password"
//                 placeholder="Enter password"
//                 secureTextEntry={passwordVisibility}
//                 textContentType="newPassword"
//                 rightIcon={rightIcon}
//                 handlePasswordVisibility={handlePasswordVisibility}
//                 value={values.password}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//               />
//               <FormErrorMessage error={errors.password} visible={touched.password} />
//               <TextInput
//                 name="confirmPassword"
//                 placeholder="Confirm password"
//                 secureTextEntry={confirmPasswordVisibility}
//                 textContentType="password"
//                 rightIcon={confirmPasswordIcon}
//                 handlePasswordVisibility={handleConfirmPasswordVisibility}
//                 value={values.confirmPassword}
//                 onChangeText={handleChange('confirmPassword')}
//                 onBlur={handleBlur('confirmPassword')}
//               />
//               <FormErrorMessage
//                 error={errors.confirmPassword}
//                 visible={touched.confirmPassword}
//               />
//               {errorState !== '' ? (
//                 <FormErrorMessage error={errorState} visible={true} />
//               ) : null}
//               <Button style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Signup</Text>
//               </Button>
//             </>
//           )}
//         </Formik>
//         <Button
//           style={styles.borderlessButtonContainer}
//           borderless
//           title="Already have an account?"
//           onPress={() => console.log('Create Account success!')}
//         />
//       </KeyboardAwareScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 12,
//   },
//   logoContainer: {
//     alignItems: 'center',
//   },
//   screenTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     paddingTop: 20,
//   },
//   button: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 8,
//     backgroundColor: Colors.orange,
//     padding: 10,
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: Colors.white,
//     fontWeight: '700',
//   },
//   borderlessButtonContainer: {
//     marginTop: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import { TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Login');
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Welcome back!</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => handleLogin(values)}>
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <>
              <TextInput
                name='email'
                leftIconName='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput
                name='password'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
        <Button style={styles.borderlessButtonContainer} borderless title={'Create a new account?'} onPress={() => {}} />
        <Button style={styles.borderlessButtonContainer} borderless title={'Forgot Password'} onPress={() => {}} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


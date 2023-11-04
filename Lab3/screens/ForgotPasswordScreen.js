import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { useFirebaseApp } from 'reactfire';
import { passwordResetSchema } from '../utils';
import { Colors } from '../config';
import { View, TextInput, Button, FormErrorMessage } from '../components';

export const ForgotPasswordScreen = () => {
  const firebaseApp = useFirebaseApp();
  const auth = firebaseApp.auth();
  const [errorState, setErrorState] = useState('');

  const handleSendPasswordResetEmail = async (values) => {
    const { email } = values;
    try {
      await auth.sendPasswordResetEmail(email);
      console.log('Success: Password Reset Email sent.');
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Reset your password</Text>
      </View>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={passwordResetSchema}
        onSubmit={values => handleSendPasswordResetEmail(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur
        }) => (
          <>
            {/* Email input field */}
            <TextInput
              name='email'
              leftIconName='email'
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />

            {/* Display Screen Error Messages */}
            {errorState !== '' ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}

            {/* Password Reset Send Email button */}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </Button>
          </>
        )}
      </Formik>

      {/* Button to navigate back to the Login screen */}
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title={'Go back to Login'}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12
  },
  innerContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

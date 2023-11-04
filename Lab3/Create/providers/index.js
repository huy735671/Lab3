import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider'; // Đảm bảo rằng bạn import AuthenticatedUserProvider từ đúng vị trí

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthenticatedUserProvider>
        <ForgotPasswordScreen />
      </AuthenticatedUserProvider>
    </SafeAreaProvider>
  );
};

export default App;

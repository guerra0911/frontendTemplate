// app/components/buttons/SignInButton.tsx

import React from 'react';
import ThemedButton from '@/components/templates/buttons/ThemedButton';

interface SignInButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

/**
 * SignInButton Component
 *
 * A reusable ThemedButton specifically styled for "Sign In."
 */
const SignInButton: React.FC<SignInButtonProps> = ({ isLoading, onPress }) => {
  return (
    <ThemedButton
      title={isLoading ? 'Signing In...' : 'Sign In'}
      onPress={onPress}
      disabled={isLoading}
      themeType="primary"
      customHeight={50}
      customWidth={200}
      animatedPress
      roundedAllCorners
    />
  );
};

export default SignInButton;

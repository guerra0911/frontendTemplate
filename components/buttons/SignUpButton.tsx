// app/components/buttons/SignUpButton.tsx

import React from 'react';
import ThemedButton from '@/components/templates/buttons/ThemedButton';

interface SignUpButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

/**
 * SignUpButton Component
 *
 * A reusable ThemedButton specifically styled for "Sign Up."
 */
const SignUpButton: React.FC<SignUpButtonProps> = ({ isLoading, onPress }) => {
  return (
    <ThemedButton
      title={isLoading ? 'Signing Up...' : 'Sign Up'}
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

export default SignUpButton;

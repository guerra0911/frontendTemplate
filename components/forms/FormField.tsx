import React from 'react';
import { ThemedText } from '@/components/templates/general/ThemedText';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { ThemedInput } from '../templates/forms/ThemedInput';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
}) => {
  return (
    <ThemedView style={{ marginTop: 16 }}>
      <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
        {label}
      </ThemedText>
      <ThemedInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </ThemedView>
  );
};

export default FormField;

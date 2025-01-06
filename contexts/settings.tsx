import * as React from 'react';

/**
 * Minimal icon props
 */
export type IconProps = {
  name: string;
  color: string;
  size: number;
  direction?: 'rtl' | 'ltr';
  testID?: string;
};

/**
 * Minimal settings shape, e.g. for icons or ripple config.
 */
export type Settings = {
  icon?: (props: IconProps) => React.ReactNode;
  rippleEffectEnabled?: boolean;
};

export const SettingsContext = React.createContext<Settings>({
  rippleEffectEnabled: true,
});

export const SettingsProvider = SettingsContext.Provider;
export const SettingsConsumer = SettingsContext.Consumer;

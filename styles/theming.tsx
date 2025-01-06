import * as React from 'react';
import type { InternalTheme } from '@/components/templates/portal/Portal';

/**
 * We define the shape of props for our internal theme provider.
 */
type InternalThemeProviderProps = React.PropsWithChildren<{
    theme: InternalTheme;
  }>;
  
  /**
   * A minimal context for your internal theme.
   */
  const InternalThemeContext = React.createContext<InternalTheme>({});
  
  /**
   * Hook that returns the current internal theme.
   */
  export function useInternalTheme(): InternalTheme {
    return React.useContext(InternalThemeContext);
  }
  
  /**
   * InternalThemeProvider: wraps children with the internal theme context.
   * Using PropsWithChildren ensures 'children' is recognized by TypeScript.
   */
  export const InternalThemeProvider = ({
    theme,
    children,
  }: InternalThemeProviderProps) => {
    return (
      <InternalThemeContext.Provider value={theme}>
        {children}
      </InternalThemeContext.Provider>
    );
  };
  
  /**
   * HOC that injects `theme` from context as a prop,
   * akin to React Native Paper's `withInternalTheme`.
   */
  export function withInternalTheme<
    T extends { theme?: InternalTheme } = { theme?: InternalTheme }
  >(WrappedComponent: React.ComponentType<T>) {
    return function ThemedComponent(props: Omit<T, 'theme'>) {
      const theme = useInternalTheme();
      return <WrappedComponent {...(props as T)} theme={theme} />;
    };
  }

import * as React from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './PortalHost';
import { SettingsContext } from '@/contexts/settings';
import { InternalThemeProvider, withInternalTheme } from '../../../styles/theming';

/**
 * A minimal type for an internal theme so that Portal can wrap children
 * with a theme provider if you wish. Feel free to expand this.
 */
export type InternalTheme = Record<string, unknown>;

export type PortalProps = React.PropsWithChildren<{
  /**
   * Optional theme object if you have a custom theme.
   */
  theme?: InternalTheme;
}>;

/**
 * Portal allows rendering a component at a different place in the parent tree,
 * above everything else – like a `Modal`.
 * 
 * Note: requires a `Portal.Host` above in the component tree.
 */
class Portal extends React.Component<PortalProps> {
  static Host = PortalHost;

  render() {
    const { children, theme } = this.props;

    return (
      <SettingsContext.Consumer>
        {(settings) => (
          <PortalContext.Consumer>
            {(manager) => (
              <PortalConsumer manager={manager as PortalMethods}>
                <InternalThemeProvider theme={theme || {}}>
                  {children}
                </InternalThemeProvider>
              </PortalConsumer>
            )}
          </PortalContext.Consumer>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default withInternalTheme(Portal);

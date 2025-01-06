import * as React from 'react';
import type { PortalMethods } from './PortalHost';

type PortalConsumerProps = {
  manager: PortalMethods;
  children: React.ReactNode;
};

/**
 * PortalConsumer: renders `children` into the nearest PortalManager.
 */
export default class PortalConsumer extends React.Component<PortalConsumerProps> {
  private key: number | undefined;

  componentDidMount() {
    this.checkManager();
    this.key = this.props.manager.mount(this.props.children);
  }

  componentDidUpdate() {
    this.checkManager();
    if (this.key !== undefined) {
      this.props.manager.update(this.key, this.props.children);
    }
  }

  componentWillUnmount() {
    this.checkManager();
    if (this.key !== undefined) {
      this.props.manager.unmount(this.key);
    }
  }

  private checkManager() {
    if (!this.props.manager) {
      throw new Error(
        'PortalConsumer: No portal manager found. ' +
          'Make sure you wrap your root app or screen with <Portal.Host>.'
      );
    }
  }

  render() {
    // PortalConsumer itself doesn't render children, it delegates them to PortalManager
    return null;
  }
}

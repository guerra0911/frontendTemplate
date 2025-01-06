import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import PortalManager from './PortalManager';

export type Operation =
  | { type: 'mount'; key: number; children: React.ReactNode }
  | { type: 'update'; key: number; children: React.ReactNode }
  | { type: 'unmount'; key: number };

export type PortalMethods = {
  mount: (children: React.ReactNode) => number;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
};

export const PortalContext = React.createContext<PortalMethods | null>(null);

/**
 * PortalHost is the container that actually renders all portals at the top level.
 * Usually you only need one, placed near the root of your app.
 */
export default class PortalHost extends React.Component<{
  children: React.ReactNode;
}> {
  static displayName = 'Portal.Host';

  private nextKey = 0;
  private queue: Operation[] = [];
  private manager: PortalManager | null = null;

  private setManager = (manager: PortalManager | null) => {
    this.manager = manager;

    // Process any queued operations if manager was not yet available
    while (this.queue.length && this.manager) {
      const action = this.queue.pop();
      if (action) {
        switch (action.type) {
          case 'mount':
            this.manager.mount(action.key, action.children);
            break;
          case 'update':
            this.manager.update(action.key, action.children);
            break;
          case 'unmount':
            this.manager.unmount(action.key);
            break;
        }
      }
    }
  };

  private mount = (children: React.ReactNode) => {
    const key = this.nextKey++;
    if (this.manager) {
      this.manager.mount(key, children);
    } else {
      this.queue.push({ type: 'mount', key, children });
    }
    return key;
  };

  private update = (key: number, children: React.ReactNode) => {
    if (this.manager) {
      this.manager.update(key, children);
    } else {
      const op: Operation = { type: 'mount', key, children };
      const idx = this.queue.findIndex(
        (o) => o.type === 'mount' || (o.type === 'update' && o.key === key)
      );
      if (idx > -1) {
        this.queue[idx] = op;
      } else {
        this.queue.push(op);
      }
    }
  };

  private unmount = (key: number) => {
    if (this.manager) {
      this.manager.unmount(key);
    } else {
      this.queue.push({ type: 'unmount', key });
    }
  };

  render() {
    return (
      <PortalContext.Provider
        value={{
          mount: this.mount,
          update: this.update,
          unmount: this.unmount,
        }}
      >
        <View style={styles.container} pointerEvents="box-none">
          {this.props.children}
        </View>
        <PortalManager ref={this.setManager} />
      </PortalContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

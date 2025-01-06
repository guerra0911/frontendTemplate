import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type PortalItem = {
  key: number;
  children: React.ReactNode;
};

type State = {
  portals: PortalItem[];
};

/**
 * PortalManager: maintains an array of 'portal items' that are each
 * rendered absolutely on top of everything else.
 */
export default class PortalManager extends React.PureComponent<{}, State> {
  state: State = {
    portals: [],
  };

  mount = (key: number, children: React.ReactNode) => {
    this.setState((prevState) => ({
      portals: [...prevState.portals, { key, children }],
    }));
  };

  update = (key: number, children: React.ReactNode) => {
    this.setState((prevState) => ({
      portals: prevState.portals.map((item) =>
        item.key === key ? { ...item, children } : item
      ),
    }));
  };

  unmount = (key: number) => {
    this.setState((prevState) => ({
      portals: prevState.portals.filter((item) => item.key !== key),
    }));
  };

  render() {
    return this.state.portals.map(({ key, children }) => (
      <View
        key={key}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
        collapsable={false}
      >
        {children}
      </View>
    ));
  }
}

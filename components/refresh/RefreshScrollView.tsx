import React from 'react';
import { ScrollView, RefreshControl, ScrollViewProps } from 'react-native';

interface RefreshableScrollViewProps extends ScrollViewProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  showRefreshIndicator?: boolean; // New prop to control refresh indicator visibility
}

const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
  children,
  onRefresh,
  refreshing = false,
  showRefreshIndicator = true, // Default to true if not provided
  ...props
}) => {
  return (
    <ScrollView
      {...props}
      refreshControl={
        onRefresh && showRefreshIndicator ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }>
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;

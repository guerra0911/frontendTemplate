export const Routes = {
  // Settings Routes
  settings: '/settings',
  notificationSettings: '/settings/notificationSettings',
  profileSettings: '/settings/profileSettings',
  privacySettings: '/settings/privacySettings',

  // Notifications Routes
  notifications: '/notifications',
  allNotifications: '/notifications/allNotifications',
  requestsNotifications: '/notifications/requestsNotifications',
  
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];


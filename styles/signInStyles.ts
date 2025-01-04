import { StyleSheet, Dimensions } from 'react-native';

export const signInStyles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
  keyboardView: { flex: 1 },
  mainView: { paddingHorizontal: 24, justifyContent: 'center', flex: 1 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  buttonContainer: { marginTop: 24 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', paddingTop: 20 },
  signupText: { marginRight: 5, color: '#888' },
  signupLink: { color: '#007EFF', fontWeight: '600' },
});

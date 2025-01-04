import { StyleSheet, Dimensions } from 'react-native';

export const signUpStyles = StyleSheet.create({
  container: { backgroundColor: '#F5F5F5', flex: 1 },
  keyboardView: { flex: 1 },
  scrollViewContent: { flexGrow: 1 },
  mainView: { paddingHorizontal: 24, justifyContent: 'center', flex: 1 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  buttonContainer: { marginTop: 24 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', paddingTop: 20 },
  loginText: { marginRight: 5, color: '#888' },
  loginLink: { color: '#007EFF', fontWeight: '600' },
});

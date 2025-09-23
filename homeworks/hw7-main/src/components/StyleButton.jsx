import { Pressable, Text, StyleSheet } from 'react-native';

export function StyledButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3399ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonPressed: {
    backgroundColor: '#1f7de2',
  },
});

import { Pressable, StyleSheet, Text } from "react-native"

export default function Button({onPress, children}){
    return(
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#6c8ebf",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  
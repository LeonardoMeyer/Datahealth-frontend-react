import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>DataHealth</Text>
        <Text style={styles.subHeaderText}>Sistema Hospitalar</Text>
      </View>

      {/* Área Principal */}
      <View style={styles.main}>
        <Text style={styles.welcomeText}>Bem-vindo, escolha uma opção abaixo:</Text>

        {/* Botões de Navegação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/add-patient")}
          >
            <Text style={styles.buttonText}>Adicionar Paciente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/appointments")}
          >
            <Text style={styles.buttonText}>Ver Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/doctors")}
          >
            <Text style={styles.buttonText}>Lista de Médicos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/settings")}
          >
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 DataHealth. Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#E1E1E6",
    fontSize: 16,
    marginTop: 5,
  },
  main: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    color: "#1C1C1E",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#E1E1E6",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#1C1C1E",
    fontSize: 14,
  },
});

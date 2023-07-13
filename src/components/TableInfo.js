import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function TableInfo({ characters }) {
  return (
    <View style={styles.container}>
                  <Text style={styles.heading}>Caracteristicas</Text>
      <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.textsub}>Status</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.textsub}>Especie</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.textsub}>Tipo</Text>
          </Row>
          <Row style={styles.cell}>
            <Text  style={styles.textsub}>Genero</Text>
          </Row>
        </Col>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text  style={styles.textsub}>{characters.status}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text  style={styles.textsub}>{characters.species}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text  style={styles.textsub}>{characters.type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text  style={styles.textsub}>{characters.gender}</Text>
          </Row>
        </Col>
      </Grid>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {

    height: 300,
    padding: 16,
    borderRadius: 10,
    borderColor: '#bbdf5e',
    borderWidth: 3,
    backgroundColor:  "rgba(0, 0, 0, 0.7)",
    elevation: 10,
    borderRadius: 30,
    marginHorizontal:40,
    marginVertical: 10
  },
  cell: {
    borderBottomWidth: 1,
    borderColor: '#bbdf5e',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "white"
  },
  textsub:{
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  }
});

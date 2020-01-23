import React from 'react'
import { View, Text, StyleSheet, LayoutAnimation, ScrollView } from 'react-native'
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };

    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser;

        this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.containter}>
                <ScrollView>
                    <View style={styles.top}>
                        <Text style={styles.topText}>Hola, {this.state.displayName}</Text>
                    </View>

                    <View style={{marginTop: 25, marginHorizontal: 30}}>
                        <Text style={{fontSize: 16, color: "#FFF", textAlign: "center"}}>
                            Bienvenid@ a Centro de Salud Dental, en estos momentos ya puedes disfrutar los beneficios de La Membresía de Salud Dental que tenemos para ti.
                        </Text>
                    </View>
                    
                    <View style={styles.top}>
                        <Text style={styles.topText}>Beneficios para ti</Text>
                    </View>

                    <View style={{marginTop: 25, marginHorizontal: 30}}>
                        <Text style={styles.titulo}>6 Citas de valoración</Text>
                        <Text style={styles.subtitulo}>Citas de valoración cada dos meses</Text>

                        <Text style={styles.titulo}>4 Radiografías</Text>
                        <Text style={styles.subtitulo}>Al año sin costo (al contratar un servicio o tratamiento que requiera radiografia)</Text>

                        <Text style={styles.titulo}>2x1 en Limpieza Dental</Text>
                        <Text style={styles.subtitulo}>Paga la primera y la segunda es gratis* Aplica para una persona</Text>

                        <Text style={styles.titulo}>10% Descuento</Text>
                        <Text style={styles.subtitulo}>Aplica para: Resinas, Extracciones simples, Prótesis y Ortopedia</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: "#1CCFC9"
    },
    top: {
        marginTop: 50,
        alignItems: "center"
    },
    topText: {
        fontSize: 18,
        textAlign: "center",
        color: "#FFF"
    },
    titulo: {
        backgroundColor: "#F1F2F2",
        padding: 10,
        fontSize: 16,
        color: "#5D5D5D",
        borderLeftWidth: 5,
        borderColor: "#69D3AA"
    },
    subtitulo: {
        backgroundColor: "#E6E7E8",
        padding: 10,
        color: "#575756",
        borderLeftWidth: 5,
        borderColor: "#69D3AA",
        marginBottom: 15
    }
});
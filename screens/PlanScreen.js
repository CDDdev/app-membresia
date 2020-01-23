import React from 'react'
import { View, Text, StyleSheet, LayoutAnimation, TouchableOpacity, Image } from 'react-native'
import * as firebase from 'firebase'

export default class PlanScreen extends React.Component {
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
                <View style={styles.top}>
                    <Text style={styles.topText}>Plan</Text>
                </View>

                <View style={{marginTop: 25, marginHorizontal: 30}}>
                    <Text style={styles.titulo}>Membresía de Cortesía</Text>
                    <Text style={styles.subtitulo}>Vigencia de 1 año a partir de la activación</Text>
                </View>

                <View style={styles.bot}>
                    <Image
                        source={require('../assets/bot.png')}
                        style={{marginTop: 50}}
                    ></Image>
                </View>
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
    },
    salir: {
        marginTop: 50,
        backgroundColor: "#4C2883",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 100
    },
    bot: {
        position: "absolute",
        bottom: 0,
        height: "25%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});
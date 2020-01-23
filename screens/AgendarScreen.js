import React from 'react'
import { View, Text, StyleSheet, LayoutAnimation, TouchableOpacity, Linking, Image } from 'react-native'
import * as firebase from 'firebase'

export default class AgendarScreen extends React.Component {
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
                    <Text style={styles.topText}>Agenda tu cita</Text>
                </View>

                <View style={{marginTop: 25, marginHorizontal: 30}}>
                    <Text style={{fontSize: 16, color: "#FFF", textAlign: "center"}}>Ahora puedes agendar tu primer cita de valoración</Text>
                </View>
                
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity
                        style={styles.salir}
                        onPress={ ()=>{ Linking.openURL('https://api.whatsapp.com/send?phone=523331460466&text=%C2%A1Hola!%20Quiero%20hacer%20una%20cita%20')}}
                    >
                        <Text style={{color: "#FFF", fontSize: 16}}>AGENDAR CITA</Text>
                    </TouchableOpacity>
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
        marginLeft: 5,
        fontSize: 16,
        color: "#FFF"
    },
    subtitulo: {
        backgroundColor: "#FFF",
        padding: 10,
        color: "#5D5D5D",
        borderRadius: 15,
        marginBottom: 15
    },
    salir: {
        marginTop: 50,
        backgroundColor: "#4C2883",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 200
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
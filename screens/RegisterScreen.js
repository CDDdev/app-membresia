import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({errorMessage: error.message}));
    };

    render() {
        return (
            <View style={styles.containter}>
                <StatusBar barStyle="light-content"></StatusBar>

                <View style={{alignItems: "center"}}>
                    <Image
                        source={require('../assets/authHeader.png')}
                        style={{marginTop: 50}}
                    ></Image>
                </View>

                <Text style={styles.greeting}>{`Ingresa tus datos`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({name})}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSignUp}
                >
                    <Text style={{color: "#FFF", fontWeight: "500"}}>REGÍSTRATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{alignSelf: "center", marginTop: 32}}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={{color: "#FFF", fontSize: 13}}>
                        ¿Ya tienes una cuenta? <Text style={{fontWeight: "500", color: "#4C2883"}}>Inicia sesión</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: "#1CCFC9"
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#FFF"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#FF0000",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#FFF",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#FFF",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#FFF"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#4C2883",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});
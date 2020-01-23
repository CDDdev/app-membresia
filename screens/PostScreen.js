import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

export default class PostScreen extends Component {
    constructor(props) {
        var x = firebase.auth().currentUser.email

        super(props);
        this.state = ({
            todoTasks: [],
            newTaskName: '',
            loading: false,
        });
        this.ref = firebase.firestore().collection(`user:` + x);
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({
                    taskName: doc.data().taskName
                });
            });
            this.setState({
                todoTasks: todos.sort((a, b) => {
                    return (a.taskName > b.taskName);
                }),
                loading: false
            });
        });
    }

    onPressAdd = () => {
        if (this.state.newTaskName.trim() === '') {
            alert('Campo vacío o repetido.');
            return;
        }
        this.ref.add({
            taskName: this.state.newTaskName
        }).then((data) => {
            console.log(`added data = ${data}`);
            this.setState({
                newTaskName: '',
                loading: true
            });
        }).catch((error) => {
            console.log(`error adding Firestore document = ${error}`);
            this.setState({
                newTaskName: '',
                loading: true
            });
        });
    }

    onPressDelete = () => {       
        var x = ("user:" + firebase.auth().currentUser.email)

        const { navigation } = this.props;
        this.setState({
            isLoading: true
        });
        firebase.firestore().collection(x).doc('xuJmlePWugS2UVKS8jzZ').delete().then(() => {
            console.log("Document successfully deleted!");
            this.setState({
              isLoading: false
            });
            navigation.navigate('Board');
          }).catch((error) => {
            console.error("Error removing document: ", error);
            this.setState({
              isLoading: false
            });
          });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.topText}>Agregar familiares</Text>
                </View>

                <View style={{marginTop: 25, marginHorizontal: 30}}>
                    <Text style={{fontSize: 16, color: "#FFF"}}>Nombre:</Text>
                </View>

                <View style={{
                    marginHorizontal: 30,
                }}>
                    <TextInput style={{
                        borderBottomColor: "#FFF",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        height: 40,
                        fontSize: 15,
                        color: "#FFF"
                    }}
                        keyboardType='default'
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({newTaskName: text});
                            }
                        }
                    />
                    <TouchableHighlight
                        style={{position: "absolute", right: 0}}
                        onPress={this.onPressAdd}
                    >
                        <Text style={styles.add}>+</Text>
                    </TouchableHighlight>
                </View>
                
                <ScrollView>
                    <FlatList
                        style={{marginTop: 50, marginHorizontal: 30}}
                        data={this.state.todoTasks}
                        renderItem={({ item, index }) => {
                            return (
                                <Text style={{fontSize: 16, color: "#FFF", marginBottom: 15}}>• {item.taskName} </Text>
                            );
                        }}
                        keyExtractor={(item, index) => item.taskName}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    add: {
        textAlign: "center",
        color: "#1CCFC9",
        fontSize: 18,
        backgroundColor: "#FFF",
        padding: 5,
        width: 35,
        height: 35,
        borderRadius: 35/2
    }
})
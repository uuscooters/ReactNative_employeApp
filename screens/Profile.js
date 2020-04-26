import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = (props) => {

    const { _id, name, position, email, phone, picture, salary } = props.route.params.item
    console.log(_id)
    const deleteEmploye = () => {
        fetch("http://10.0.2.2:3000/delete", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .then(deleteData => {
                Alert.alert(`${deleteData.name} delete success`)
                props.navigation.navigate("Home")
            }).catch(err => {
                Alert.alert("something wrong")
            })
    }

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }


    return (
        <View style={Styles.root}>
            <LinearGradient colors={["#0066CC", "#3333FF"]} style={{ height: "15%" }} />
            <View style={{ alignItems: "center" }}>
                <Image style={{ width: 120, height: 120, borderRadius: 60, marginTop: -50 }}
                    source={{ uri: picture }} />
            </View>
            <View style={Styles.titleView}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 16 }}>{position}</Text>
            </View>
            <Card style={Styles.cardView} onPress={() => Linking.openURL(`mailto:${email}`)}>
                <View style={Styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#006aff" />
                    <Text style={{ fontSize: 16, margin: 5 }}>{email}</Text>
                </View>
            </Card>
            <Card style={Styles.cardView} onPress={() => openDial()}>
                <View style={Styles.cardContent}>
                    <Entypo name="phone" size={32} color="#006aff" />
                    <Text style={{ fontSize: 16, margin: 5 }}>{phone}</Text>
                </View>
            </Card>
            <Card style={Styles.cardView}>
                <View style={Styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff" />
                    <Text style={{ fontSize: 16, margin: 5 }}>{salary}</Text>
                </View>
            </Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                <Button theme={theme} icon="account-edit" mode="contained" onPress={() => {
                    props.navigation.navigate(
                        "Create",
                        { _id, name, position, email, phone, picture, salary }
                    )
                }
                }>
                    Edit
                </Button>
                <Button style={{ backgroundColor: "red" }} icon="delete" mode="contained" onPress={() => deleteEmploye()}>
                    Delete
                </Button>
            </View>
        </View>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1
    },
    titleView: {
        alignItems: "center",
        margin: 20
    },
    cardView: {
        margin: 5
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    }
})

export default Profile
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({ navigation, route }) => {

    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "position":
                    return route.params.position
                case "picture":
                    return route.params.picture
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [position, setPosition] = useState(getDetails("position"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [modal, setModal] = useState(false)
    const [enableShift, setenableShift] = useState(false)

    // Create Data
    const submitData = () => {
        fetch("http://10.0.2.2:3000/send-data",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    salary,
                    position,
                    picture
                })
            })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is saved successfuly`)
                navigation.navigate("Home")
                console.log(data)
            }).catch(err => {
                Alert.alert("something wrong")
            })
    }
    // end create Data

    // upate Data
    const updateData = () => {
        fetch("http://10.0.2.2:3000/update",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: route.params._id,
                    name,
                    phone,
                    email,
                    salary,
                    position,
                    picture
                })
            })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is updated`)
                navigation.navigate("Home")
                console.log(data)
            }).catch(err => {
                Alert.alert("something wrong")
            })
    }

    // start handle upload from gallery
    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleImage(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }
    // end handle upload from gallery

    // start handle upload from camera
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleImage(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }
    // end handle upload from camera

    // setting image for uploading
    const handleImage = (image) => {
        const dataImage = new FormData()
        dataImage.append('file', image)
        dataImage.append('upload_preset', 'employeApp')
        dataImage.append("cloud_name", "dbxyy2z8g")

        fetch("https://api.cloudinary.com/v1_1/dbxyy2z8g/image/upload",
            {
                method: "post",
                body: dataImage
            }).then(res => res.json())
            .then(dataImage => {
                setPicture(dataImage.url)
                setModal(false)
            }).catch(err => {
                Alert.alert("Error while uploading")
            })
    }
    // end setting

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View>
                <TextInput
                    style={styles.inputStyle}
                    mode='outlined'
                    label='Name'
                    placeholder="Full Name"
                    theme={theme}
                    value={name}
                    onFocus={() => setenableShift(false)}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    mode='outlined'
                    label='Email'
                    placeholder={"Example@mail.com"}
                    theme={theme}
                    value={email}
                    onFocus={() => setenableShift(false)}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    mode='outlined'
                    label='Phone'
                    placeholder={"Exp: +628123456"}
                    theme={theme}
                    value={phone}
                    keyboardType='number-pad'
                    onFocus={() => setenableShift(false)}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    mode='outlined'
                    label='position'
                    placeholder={"Position"}
                    theme={theme}
                    value={position}
                    onFocus={() => setenableShift(true)}
                    onChangeText={text => setPosition(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    mode='outlined'
                    label='Salary'
                    placeholder={"Mounth Salary"}
                    theme={theme}
                    value={salary}
                    onFocus={() => setenableShift(true)}
                    onChangeText={text => setSalary(text)}
                />
                <Button
                    style={styles.inputStyle}
                    uppercase={false}
                    icon={picture === "" ? "upload" : "check"}
                    mode="outlined"
                    onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                {route.params ?
                    <Button
                        style={styles.inputStyle}
                        mode="contained"
                        icon="content-save"
                        onPress={() => updateData()}>
                        Update Details
                    </Button>
                    :
                    <Button
                        style={styles.inputStyle}
                        mode="contained"
                        icon="content-save"
                        onPress={() => submitData()}>
                        Save
                    </Button>
                }

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => { setModal(false) }}>
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button uppercase={false} icon="camera" mode="contained" onPress={() => pickFromCamera()}>
                                Camera
                    </Button>
                            <Button uppercase={false} icon="image-area" mode="contained" onPress={() => pickFromGallery()}>
                                Galery
                    </Button>
                        </View>
                        <Button style={{ backgroundColor: "orange" }} mode="contained" onPress={() => setModal(false)}>
                            Cancel
                    </Button>
                    </View>
                </Modal>

            </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors: {
        primary: "#7068FF"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 10
    },
    modalView: {
        position: 'absolute',
        bottom: 1,
        width: "100%",
        backgroundColor: "white"
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    save: {
        position: 'absolute',
        bottom: 1,
        width: "100%",
        backgroundColor: "#7077f9"
    }
})

export default CreateEmployee
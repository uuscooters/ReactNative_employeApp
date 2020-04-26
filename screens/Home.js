import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { myContext } from '../App'
const Home = ({ navigation, route }) => {
    // const [data, setData] = useState([])
    // const [loading, setloading] = useState(true)
    // const dispatch = useDispatch()
    // const { data, loading } = useSelector((state) => {
    //     return state
    // })

    const { state, dispatch } = useContext(myContext)
    const {data,loading} = state

    const fetchData = () => {
        fetch("http://10.0.2.2:3000/")
            .then(res => res.json())
            .then(results => {
                // console.log(results)
                // setData(results)
                // setloading(false)
                dispatch({ type: "ADD_DATA", payload: results })
                dispatch({ type: "SET_LOADING", payload: false })
            }).catch(err => {
                Alert.alert("something wrong")
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard} onPress={() => navigation.navigate("Profile", { item })}>
                <View style={styles.cardView}>
                    <Image style={styles.images}
                        source={{ uri: item.picture }} />
                    <View>
                        <Text style={styles.textTitle}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    // console.log(item)
                    return renderList(item)
                }}
                keyExtractor={item => item._id}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />
            <FAB
                onPress={() => navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                theme={{ colors: { accent: "#46c28e" } }}
                icon="plus" />
        </View>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    images: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    textTitle: {
        fontSize: 20,
        marginLeft: 5
    },
    text: {
        fontSize: 15,
        margin: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Home
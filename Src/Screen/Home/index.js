import {
    View, Text, SafeAreaView, ScrollView, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { FontAwesome5, AntDesign, MaterialIcons, Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardItem from '../../Components/DashboardItem';
import { addResturants } from '../../Config/Firebase';


const Home = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [rest, setrest] = useState([])

    useEffect(() => {
        Resturants()
    }, [])

    const Resturants = async () => {
        const result = await addResturants()
        setrest(result)
        console.log('result', result)
    }
    console.log('rest', rest)
    return (
        <>
            <SafeAreaView style={styles.container}>

                {/* Header Start */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        marginTop: 20,
                        marginLeft: 20,
                    }}>
                        <FontAwesome5 name="hamburger" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 20,
                        position: 'relative',
                        right: 90
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>
                            Current Location</Text>
                        <Text
                            style={{
                                color: '#fff',
                            }}>
                            Nazimabad</Text>
                    </TouchableOpacity>
                    <View style={styles.flexses}>
                        <TouchableOpacity style={{
                            position: 'relative',
                            right: 20
                        }}>
                            <AntDesign name="hearto" size={24} color="#fff" /></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Cart")} >
                            <MaterialCommunityIcons name="cart-arrow-right" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <TextInput
                        style={{
                            position: 'relative',
                            bottom: 60,
                            marginLeft: 20,
                            width: '90%',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            padding: 7,
                            paddingLeft: 43,
                            borderRadius: 20
                        }}
                        placeholder="Seacrh for shops & resturants"
                    />
                    <View style={{
                        position: 'relative',
                        bottom: 93,
                        left: 30,
                    }}>
                        <Feather name="search" size={24} color="gray" />
                    </View>
                </View>

                {/* ----> Header End <----  */}

                {/* ----> DashboardItem Start <----  */}
                <View
                    style={{
                        padding: 20,
                        position: 'relative',
                        bottom: 50,
                        paddingBottom: 150
                    }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <>
                            {rest ?
                                <>
                                    {rest.map((e,i) => {
                                        return <TouchableOpacity onPress={() => {
                                            navigation.navigate('Details', {
                                                itemId: e.id,
                                            });
                                        }}>
                                            <DashboardItem
                                                image={{ uri: e.image }}
                                                title={e.title}
                                                title_dollar={e.title_dollar}
                                                sub_title={e.sub_title}
                                                key={i}
                                            />
                                        </TouchableOpacity>
                                    })}
                                </>
                                : ''}
                        </>
                    </ScrollView>
                </View>


                {/* ----> DashboardItem End <----  */}



            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        backgroundColor: '#d70f64',
        height: '17%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexses: {
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 20
    }
})

export default Home
import {
    View, TouchableOpacity,Text,Button, StyleSheet, SafeAreaView,CheckBox, Platform, StatusBar, ImageBackground, ActivityIndicator, Share
} from 'react-native'
import { useState, useEffect, useLayoutEffect } from 'react'
import { MaterialIcons, EvilIcons, Feather, AntDesign ,FontAwesome} from '@expo/vector-icons';
import { getdetail, getMenu } from '../Config/Firebase';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import { useDispatch , useSelector} from 'react-redux';
import {addToCArt} from '../store/action';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const DetailsScreen = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [idData, setIdData] = useState();
    const [delivery, setDelivery] = useState()
    const [checked, setChecked] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [myValue, setMyValue] = useState(0)
    const [menuItems, setMenu] = useState()
    const cartItems = useSelector((state) => state.selectedItem);
     

    const dispatch = useDispatch()
    console.log('cart item--->',cartItems);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: idData.image,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getDetailbyid()
    }, [])
    useEffect(() => {
        getMenuItems()

    }, [])

    const { itemId } = route.params;
    const getDetailbyid = async () => {
        const data = await getdetail(itemId)
        setIdData(data);
    }
    const selectedMenu = (id) =>{
        const r =  dispatch(addToCArt({
            menuItems: {id}

        }))
        console.log(r,'selected dispatch');
       

    }
    const getMenuItems = async () => {
        const menudata = await getMenu(itemId)
        setMenu(menudata)
    // dispatch(addToCArt(menudata))

        console.log(menudata, 'menu ka data')
    }
    if (!idData) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator />
        </View>
    }
    console.log(idData.title, 'id ka data')

    var RandomNumber = Math.floor(Math.random() * 50) + 20;



    const addValue = () => {
        setMyValue(myValue + 1);
    }
    const minusValue = () => {
        if (myValue == 0) {
            setMyValue(0)
        } else {
            setMyValue(myValue - 1)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <ImageBackground style={styles.image} source={{ uri: idData.image }} >
                        <View style={{
                            padding: 20,
                            paddingTop: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={styles.top_menu_icon}>
                                <Feather onPress={() => navigation.goBack()} name="arrow-left" size={24} color="#d70f64" />
                            </View>
                            <View style={styles.top_menu_icon}>
                                <AntDesign onPress={onShare} name="sharealt" size={24} color="#d70f64" />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>{idData.title}</Text>
                <View style={styles.texts}>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ paddingRight: 5, color: 'gray', fontSize: 12 }}>2.7km away</Text>
                        <Text style={{ paddingRight: 5, fontSize: 12 }}>|</Text>
                        <Text style={{ paddingRight: 5, color: 'gray', fontSize: 12, fontWeight: 'bold' }}>Rs Minimum </Text>
                        <Text style={{ paddingRight: 5, fontSize: 12 }}>|</Text>
                        <Text>
                            <MaterialIcons name="star-rate" size={14} color='#d70f64' />
                            <MaterialIcons name="star-rate" size={14} color='#d70f64' />
                            <MaterialIcons name="star-rate" size={14} color='#d70f64' />
                            <MaterialIcons name="star-rate" size={14} color='#d70f64' />
                            <MaterialIcons name="star-rate" size={14} color='gray' />
                        </Text>
                        <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                            1000+ ratings
                        </Text>
                    </View>
                    <View style={styles.moreInfo}>
                        <Text style={{
                            color: '#d70f64',
                            fontWeight: 'bold'
                        }}>More Info</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 5, marginTop: 10 }}>
                    <EvilIcons name="clock" size={24} color='#d70f64' />
                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Delivery: {RandomNumber} min</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#DCDCDC',
                        borderBottomWidth: 1,
                        marginTop: 20
                    }}
                />
                <View style={{
                    marginTop: 10,
                    padding: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Variation</Text>
                        <Text style={{
                            color: 'gray'
                        }}>Select one</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#D2DAE1',
                        borderRadius: 15,
                        height: 35,
                        width: 90,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>1 Required</Text>
                    </View>
                </View>
                {menuItems.map(items => {
                    console.log(items,'menu ke item')
                return   <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            {/* <Checkbox
                            color='#d70f64'
                            value={true}
                            // onValueChange={setIsChecked}
                        /> */}
                        <TouchableOpacity onPress={()=>selectedMenu(items)}>
                        <FontAwesome 
                         name="plus-square-o"
                         size={30}
                         color="#d70f64"
                        />
                        {/* <AntDesign name="plus-square-o" size={34} color="#d70f64" /> */}

                        </TouchableOpacity>
                        {/* <Button onPress={()=>selectedMenu(items)} title='ADD'></Button> */}
                            {/* <RadioButton
                                value={{item: items.name, price: items.price}}
                                status={checked === items.name ? 'checked' : 'unchecked'}
                                onPress={() => {setChecked({item: items.name, price: items.price}); console.log(checked,'radio butoon')} }
                                color='#d70f64'
                            /> */}
                            <Text style={{ paddingLeft: 20 }}>{items.name}</Text>
                        </View>
                        <View>
                            <Text>Rs. {items.price}</Text>
                        </View>
                    </View>
                })}

                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <RadioButton
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                            color='#d70f64'
                        />
                        <Text style={{ paddingLeft: 20 }}>{idData.beef}</Text>
                    </View>
                    <View>
                        <Text>Rs. {idData.beef_price}</Text>
                    </View>
                </View> */}
                {/* <View style={{
                    marginTop: 10,
                    padding: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Frequently bought together</Text>
                        <Text style={{
                            color: 'gray'
                        }}>Others around you like this</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#D2DAE1',
                        borderRadius: 15,
                        height: 35,
                        width: 90,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>Optional</Text>
                    </View>
                </View> */}
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    paddingLeft: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10
                    }}>
                        <Checkbox
                            color='#d70f64'
                            value={true}
                            onValueChange={setIsChecked}
                        />
                        <Text style={{ paddingLeft: 40 }}>{idData.single}</Text>
                    </View>
                    <View>
                        <Text>Rs. {idData.single_price}</Text>
                    </View>
                </View> */}

                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10
                    }}>
                        <Checkbox
                            color='#d70f64'
                            value={true}
                            onValueChange={setIsChecked}
                        />
                        <Text style={{ paddingLeft: 40 }}>{idData.double}</Text>
                    </View>
                    <View>
                        <Text>Rs. {idData.double_price}</Text>
                    </View>
                </View> */}
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    alignItems: 'center'
                }}> */}
                    {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10
                    }}>
                        <Checkbox
                            color='#d70f64'
                            value={true}
                            onValueChange={setIsChecked}
                        />
                        <Text style={{ paddingLeft: 40 }}>{idData.kg}</Text>
                    </View>
                    <View>
                        <Text>Rs. {idData.kilo_price}</Text>
                    </View> */}
                {/* </View> */}
                <View
                    style={{
                        borderBottomColor: '#DCDCDC',
                        borderBottomWidth: 1,
                        marginTop: 20
                    }}
                />

                <View style={{ padding: 10 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Special Instructions</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{
                            backgroundColor: '#D2DAE1',
                            padding: 7,
                            borderRadius: 50
                        }}>
                            <AntDesign onPress={minusValue} name="minus" size={24} color="#fff" />
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>{cartItems.length}</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#d70f64',
                            padding: 7,
                            borderRadius: 50
                        }}>
                            <AntDesign onPress={addValue} name="plus" size={24} color="#fff" />
                        </View>
                        <View style={{
                            marginLeft: 30
                        }}>
                            <TouchableOpacity style={{
                                width: 250,
                                backgroundColor: '#D2DAE1',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 10,
                            }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                style={{
                  width: 370,
                  backgroundColor: "#d70f64",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: '700' , letterSpacing: 2 , fontSize: 18 }}>
                  Your Cart {cartItems.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    top_menu_icon: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10
    },
    image: {
        width: '100%',
        height: 180,
    },
    texts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
})

export default DetailsScreen
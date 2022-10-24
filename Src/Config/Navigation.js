import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import Home from '../Screen/Home';
import Profile from '../Screen/Profile';
import Login from '../Screen/Login';
import DetailScreen from '../Components/DetailScreen'
import Signup from '../Screen/Signup';
import Cart from '../Screen/Cart';
import CustomDrawer from '../Components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
    const [user, setUser] = useState(true)

    // useEffect(() => {
    //   setUser(!user)
    //   console.log(user)
    // },[])

    return <NavigationContainer>
        {
            user ? <MainStack />
                : <AuthStack />
        }
    </NavigationContainer>
}

function MainStack() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#d70f64',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#d70f64',
            }}>
            <Drawer.Screen name="Dashboard" component={DashboardStack}
                options={{
                    title: 'Home',

                }}
            />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Signup} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name='Details' component={DetailScreen} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
    );
}

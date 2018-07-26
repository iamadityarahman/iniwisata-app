import React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {DrawerItems} from 'react-navigation';
import {getLocalString} from "../realm/LocalString";
import jwtdecode from 'jwt-decode';
import {STATUSBAR_APLIKASI} from "../color";

const styles = StyleSheet.create({
    headerContainer: {
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerBackground: {
        backgroundColor: '#ccc',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    userInfoContainer: {
        paddingLeft: 15
    },
    userProfile: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userName: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 3,
        fontSize: 15,
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 2}
    },
    userMail: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 3,
        fontSize: 12,
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 2}
    }
});

const userToken = getLocalString('token');
const userDetail = jwtdecode(userToken);

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...userDetail
        };
    }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={STATUSBAR_APLIKASI}
                />
                <View
                    style={styles.headerContainer}
                >
                    <Image
                        source={require('../img/header_drawer.jpg')}
                        style={styles.headerBackground}
                    />
                    <View style={styles.userInfoContainer}>
                        <Image
                            source={{uri: `http://10.0.2.2:3030/photo/thumbnail/${this.state.img}`}}
                            style={styles.userProfile}
                        />
                        <Text style={styles.userName}>{this.state.nama}</Text>
                        <Text style={styles.userMail}>{this.state.email}</Text>
                    </View>
                </View>
                <DrawerItems {...this.props} />
            </View>
        );
    }
}

export default DrawerMenu;

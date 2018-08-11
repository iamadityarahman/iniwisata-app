import React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {DrawerItems} from 'react-navigation';
import {iniwisata_primary_dark} from "../color";
import {connect} from 'react-redux';

class DrawerMenu extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={iniwisata_primary_dark}
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
                            source={{uri: user.img}}
                            style={styles.userProfile}
                        />
                        <Text style={styles.userName}>{user.nama}</Text>
                        <Text style={styles.userMail}>{user.email}</Text>
                    </View>
                </View>
                <DrawerItems {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerBackground: {
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(DrawerMenu);

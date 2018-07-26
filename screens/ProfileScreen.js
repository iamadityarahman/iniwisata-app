import React from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {INIWISATA_MUDA, STATUSBAR_APLIKASI} from "../color";
import {getLocalString} from "../realm/LocalString";
import jwtdecode from "jwt-decode";

const userToken = getLocalString('token');
const userDetail = jwtdecode(userToken);

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profile',
            headerLeft: (
                <Icon
                    name="ios-menu"
                    size={30}
                    color="white"
                    style={{paddingLeft: 20}}
                    onPress={() => navigation.openDrawer()}
                />
            ),
            headerStyle: {
                backgroundColor: STATUSBAR_APLIKASI
            },
            headerTintColor: 'white'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            ...userDetail
        };
    }

    render() {
        return (
            <ScrollView
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#FF4A4A"
                />
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{uri: `http://10.0.2.2:3030/photo/thumbnail/${this.state.img}`}}
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 75,
                            marginTop: 20
                        }}
                    />
                    <TouchableOpacity>
                        <Text
                            style={{
                                margin: 7,
                                color: INIWISATA_MUDA,
                                fontSize: 12
                            }}
                        >
                            Ubah Photo <Icon name="md-create"/>
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text>UDIN</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

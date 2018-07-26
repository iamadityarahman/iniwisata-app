import React from 'react';
import {View, Text} from 'react-native';
import {clearLocalString} from "../realm/LocalString";

class LogOutScreen extends React.Component {
    constructor(props) {
        super(props);
        clearLocalString();
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Log Out</Text>
            </View>
        );
    }
}

export default LogOutScreen;

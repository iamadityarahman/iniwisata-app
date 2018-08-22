import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {clearLocalString} from "../realm/LocalString";
import {clearUser} from "../redux/actions/user";
import {connect} from 'react-redux';
import {clearWisataList} from "../redux/actions/wisataList";
import {iniwisata_primary} from "../color";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";

class LogOutScreen extends React.Component {
    async logOut() {
        await clearLocalString();
        await clearUser();
        await clearWisataList();
        this.props.navigation.navigate('Splash');
    }

    componentDidMount() {
        this.logOut();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: iniwisata_primary
            }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={iniwisata_primary}
                />
                <SkypeIndicator
                    color="white"
                    size={50}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    clearUser: () => dispatch(clearUser()),
    clearWisataList: () => dispatch(clearWisataList())
});

export default connect(null, mapDispatchToProps)(LogOutScreen);

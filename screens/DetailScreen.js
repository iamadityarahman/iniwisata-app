import React from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import {Card, CardImage, CardTitle} from 'react-native-cards';

class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_tempat: this.props.navigation.state.params.nama_tempat,
            gambar: this.props.navigation.state.params.gambar,
            alamat: this.props.navigation.state.params.alamat
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Informasi',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-information-circle" size={25} color={tintColor}/>
        )
    });

    render() {
        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={this.state.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <ScrollView>
                    <ImageBackground
                        style={{ height: 250}}
                        source={{uri: `http://10.0.2.2:3030/wisata/thumbnail/${this.state.gambar}`}}
                    />
                    <Card>
                        <Text>Alamat:</Text>
                        <Text>{this.state.alamat}</Text>
                    </Card>
                </ScrollView>

            </View>
        );
    }
}

export default DetailScreen;

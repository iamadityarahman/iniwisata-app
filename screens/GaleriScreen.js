import React from 'react';
import {View, StatusBar, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import {connect} from 'react-redux';
import ImageView from 'react-native-image-view';
import {iniwisata_primary_dark} from "../color";

class GaleriScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'GALERI',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-images" size={25} color={tintColor}/>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            statusBarColor: iniwisata_primary_dark,
            imageIndex: 0,
            isVisibleImageView: false
        };
    }

    render() {
        const {detailWisata, galeri} = this.props;
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={this.state.statusBarColor}
                />
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={detailWisata.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <ScrollView style={{marginBottom: 56}}>
                    {
                        galeri.map((image, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this.setState({
                                            imageIndex: index,
                                            isVisibleImageView: true,
                                            statusBarColor: 'black'
                                        });
                                    }}
                                    activeOpacity={0.9}
                                >
                                    <Image
                                        style={{height:200}}
                                        source={image.source}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                {
                    galeri.length > 0 ? (
                        <ImageView
                            images={this.props.galeri}
                            imageIndex={this.state.imageIndex}
                            isVisible={this.state.isVisibleImageView}
                            onClose={() => {this.setState({statusBarColor: iniwisata_primary_dark})}}
                        />
                    ) : null
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    detailWisata: state.wisataOpen.detailWisata,
    galeri: state.wisataOpen.galeri
});

export default connect(mapStateToProps)(GaleriScreen);

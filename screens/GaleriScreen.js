import React from 'react';
import {View, StatusBar, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import {connect} from 'react-redux';
import {ambilGaleri} from "../redux/actions/galeri";
import ImageView from 'react-native-image-view';

class GaleriScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBarColor: '#FF4A4A',
            nama_tempat: this.props.navigation.state.params.nama_tempat,
            id: this.props.navigation.state.params.id,

            imageIndex: 0,
            isVisibleImageView: false
        };
    }

    componentWillMount() {
        this.props.ambilGaleri(this.state.id);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Galeri Photo',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-images" size={25} color={tintColor}/>
        )
    });

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={this.state.statusBarColor}
                />
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={this.state.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <ScrollView style={{marginBottom: 56}}>
                    {
                        this.props.galeri.map((image, index) => {
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
                    this.props.galeri.length > 0 ? (
                        <ImageView
                            images={this.props.galeri}
                            imageIndex={this.state.imageIndex}
                            isVisible={this.state.isVisibleImageView}
                            onClose={() => {this.setState({statusBarColor: '#FF4A4A'})}}
                        />
                    ) : (false)
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    galeri: state.galeri
});

const mapDispatchToPtops = dispatch => ({
    ambilGaleri: id => dispatch(ambilGaleri(id))
});

export default connect(mapStateToProps, mapDispatchToPtops)(GaleriScreen);

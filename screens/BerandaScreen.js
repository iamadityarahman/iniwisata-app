import React from 'react';
import {View, StatusBar, Text, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {Toolbar} from 'react-native-material-ui'
import {displayName} from '../app.json';
import {connect} from 'react-redux';
import {ambilSemuaWisata, cariWisata, bersihkanWisata} from "../redux/actions/wisata";
import CardWisata from "../components/CardWisata";

class BerandaScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            page: 1,
            refreshing: false
        };

        this.props.ambilSemuaWisata();
    }

    async cariWisata(keyword) {
        try {
            await this.setState({page: 1, keyword});
            await this.props.bersihkanWisata();
            this.props.cariWisata(keyword);
        } catch (e) {
            console.error(e);
        }
    }

    async refresh() {
        try {
            await this.setState({page: 1, keyword: ''});
            await this.setState({refreshing: true});
            await this.props.cariWisata(this.state.keyword);
            await this.setState({refreshing: false});
        } catch (e) {
            console.error(e);
        }
    }

    loadMore() {
        const totalWisata = this.props.wisata.length;
        const totalPage = Math.ceil(totalWisata/5);
        if (this.state.page < totalPage) {
            this.setState({page: this.state.page+1});
        }
    }

    render() {
        const wisata = this.props.wisata;
        const potongWisata = wisata.slice(0, this.state.page*5);
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#FF4A4A"
                />
                <Toolbar
                    leftElement="menu"
                    centerElement="INIWISATA"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Cari tempat wisata',
                        onChangeText: keyword => {this.cariWisata(keyword)}
                    }}
                    onLeftElementPress={() => { this.props.navigation.openDrawer() }}
                />
                <FlatList
                    style={{marginTop: 6, marginBottom: 6}}
                    data={potongWisata}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CardWisata {...item} {...this.props} />}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    wisata: state.wisata
});

const mapDispatchToProps = dispatch => ({
    ambilSemuaWisata: () => dispatch(ambilSemuaWisata()),
    bersihkanWisata: () => dispatch(bersihkanWisata()),
    cariWisata: (keyword) => dispatch(cariWisata(keyword)),
    cariWisataPerpage: (keyword, page) => dispatch(cariWisataPerpage(keyword, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(BerandaScreen);

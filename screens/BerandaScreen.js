import React from 'react';
import {View, Text, FlatList, Slider, ToastAndroid, StyleSheet} from 'react-native';
import {Toolbar, ActionButton} from 'react-native-material-ui'
import {displayName} from '../app.json';
import {connect} from 'react-redux';
import {fetchWisataPerpage, clearWisataList, fetchCariWisata} from "../redux/actions/wisataList";
import CardWisata from "../components/CardWisata";
import {iniwisata_primary_dark, iniwisata_secondary_text} from "../color";
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {showLocalString} from "../realm/LocalString";
import {SkypeIndicator, MaterialIndicator} from 'react-native-indicators';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import FilterDialog from "../components/FilterDialog";

class BerandaScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            page: 1,
            dialogVisible: false,
            filterRating: 0,
            filterHargaDari: 0,
            filterHargaSampai: 1000000,
            onLoadMore: false,
            searchOpen: false
        };
        this.props.fetchWisataPerpage('', 1, 0, 1000000);
        this.renderFooter = this.renderFooter.bind(this);
        this.filterOnChange = this.filterOnChange.bind(this);
    }

    cariWisata(keyword) {
        this.setState({
            keyword,
            page: 1,
            filterHargaDari: 0,
            filterHargaSampai: 1000000
        });
        this.props.fetchCariWisata(keyword, 0, 1000000);
    }

    async loadMore() {
        if (this.state.page < this.props.wisataList.total_page) {
            await this.setState({page: this.state.page + 1, onLoadMore: true});
            await this.props.fetchWisataPerpage(
                this.state.keyword,
                this.state.page,
                this.state.filterHargaDari,
                this.state.filterHargaSampai
            );
        }
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 5
                }}
            />
        );
    }

    renderEmpty() {
        return (
            <View style={{
                marginVertical: 20,
                marginHorizontal: 40
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>
                    {
                        this.state.keyword == '' ? (
                            `Tidak terdapat data tempat wisata`
                        ) : (
                            `Tidak ditemukan tempat wisata dengan kata kunci, ${this.state.keyword}`
                        )
                    }
                </Text>
            </View>
        );
    }

    componentWillUnmount() {
        this.props.clearWisataList();
    }

    renderHeader() {
        return (
            <View
                height={5}
            />
        )
    }

    renderFooter() {
        return (
            <View style={styles.footerContainer}>
                {
                    this.props.wisataList.onLoadMore ? (
                        <View style={styles.loadmoreIdicator}>
                            <MaterialIndicator
                                color={iniwisata_primary_dark}
                                size={20}
                            />
                        </View>
                    ) : (
                        <View height={5}/>
                    )
                }
            </View>
        )
    }

    filterOnChange(index, value) {
        const {filterHargaDari, filterHargaSampai} = value;
        this.setState({
            filterHargaDari,
            filterHargaSampai
        });
    }

    async sendFilter() {
        this.setState({dialogVisible: false});
        await this.setState({page: 1});
        await this.props.fetchCariWisata(
            this.state.keyword,
            this.state.filterHargaDari,
            this.state.filterHargaSampai
        );
    }

    closeSearch() {
        this.setState({searchOpen: false});
    }

    render() {
        const {wisataList} = this.props;
        return (
            <View style={{
                flex: 1
            }}>
                <FilterDialog
                    valueNow={[this.state.filterHargaDari, this.state.filterHargaSampai]}
                    filterHargaSampaiVal={this.state.filterHargaSampai}
                    visible={this.state.dialogVisible}
                    positiveButton={{
                        title: "OK",
                        onPress: this.sendFilter.bind(this)
                    }}
                    negativeButton={{
                        title: "Cancel",
                        onPress: () => {this.setState({dialogVisible: false})}
                    }}
                    onSelect={(index, value) => this.filterOnChange(index, value)}
                />
                <Toolbar
                    isSearchActive={this.state.searchOpen}
                    leftElement="menu"
                    centerElement="INIWISATA"
                    searchable={{
                        onSearchPressed: () => {this.setState({searchOpen: true})},
                        autoFocus: true,
                        placeholder: 'Cari tempat wisata',
                        onChangeText: keyword => {this.cariWisata(keyword)}
                    }}
                    onLeftElementPress={() => { this.props.navigation.openDrawer() }}
                />
                {
                    this.props.wisataList.isLoading ? (
                        <View style={styles.onloadContainer}>
                            <SkypeIndicator
                                color={iniwisata_primary_dark}
                            />
                        </View>
                    ) : (
                        <FlatList
                            data={wisataList.data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <CardWisata closeSearch={this.closeSearch.bind(this)} navigation={this.props.navigation} {...item}/>}
                            onEndReached={this.loadMore.bind(this)}
                            onEndReachedThreshold={0.1}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={this.renderEmpty.bind(this)}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                        />
                    )
                }
                <View>
                    <ActionButton
                        onPress={() => this.setState({dialogVisible: true})}
                        icon={<IconFA name="filter" color={iniwisata_secondary_text} size={25}/>}
                        style={{
                            container: {
                                backgroundColor: iniwisata_primary_dark
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadmoreIdicator: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    onloadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => ({
    wisataList: state.wisataList,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchWisataPerpage: (keyword, page, filterHargaDari, filterHargaSampai) => dispatch(fetchWisataPerpage(keyword, page, filterHargaDari, filterHargaSampai)),
    clearWisataList: () => dispatch(clearWisataList()),
    fetchCariWisata: (keyword, filterHargaDari, filterHargaSampai) => dispatch(fetchCariWisata(keyword, filterHargaDari, filterHargaSampai))
});

export default connect(mapStateToProps, mapDispatchToProps)(BerandaScreen);

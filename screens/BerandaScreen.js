import React from 'react';
import {View, Text, FlatList, Slider, ToastAndroid, StyleSheet} from 'react-native';
import {Toolbar, ActionButton} from 'react-native-material-ui'
import {displayName} from '../app.json';
import {connect} from 'react-redux';
import {fetchWisataPerpage, clearWisataList, fetchCariWisata} from "../redux/actions/wisataList";
import CardWisata from "../components/CardWisata";
import {iniwisata_primary_dark, iniwisata_secondary_text} from "../color";
import IconFA from 'react-native-vector-icons/FontAwesome';
import {showLocalString} from "../realm/LocalString";
import {SkypeIndicator, MaterialIndicator} from 'react-native-indicators';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {clearFilter} from "../redux/actions/filter";

class BerandaScreen extends React.Component {
    constructor(props) {
        super(props);
        const {filterHargaDari, filterHargaSampai, filterRating, filterJarak} = this.props.filter;
        this.state = {
            dialogVisible: false,
            onLoadMore: false,
            searchOpen: false,
            searchWisata: false,
            onRefresh: false,
            onFiltering: false,

            myLoc: null,
            keyword: '',
            page: 1,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        };
        this.renderFooter = this.renderFooter.bind(this);
    }

    componentWillMount() {
        this.getMyLoc();
    }

    async getMyLoc() {
        await navigator.geolocation.getCurrentPosition(
            pos => {
                const myLoc = `${pos.coords.latitude},${pos.coords.longitude}`;
                this.setState({myLoc});
                this.props.fetchWisataPerpage({
                    myLoc,
                    keyword: '',
                    page: 1,
                    filterHargaDari: 0,
                    filterHargaSampai: 1000000,
                    filterRating: 0,
                    filterJarak: 0
                });
            },
            err => {
                console.log(err)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge:10000}
        );

    }

    async refreshList() {
        const {myLoc, keyword, filterHargaDari, filterHargaSampai, filterRating, filterJarak} = this.state;
        await this.setState({onRefresh: true, searchOpen: false});
        await this.props.clearFilter();
        await this.setState({
            keyword: '',
            page: 1
        });
        await this.props.fetchCariWisata({
            myLoc,
            keyword: '',
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        });
        this.setState({onRefresh: false});
    }

    async cariWisata() {
        const {myLoc, keyword, filterHargaDari, filterHargaSampai, filterRating, filterJarak} = this.state;
        if (this.state.keyword !== '') {
            await this.setState({searchWisata: true});
            await this.setState({page: 1});
            await this.props.fetchCariWisata({
                myLoc,
                keyword,
                filterHargaDari,
                filterHargaSampai,
                filterRating,
                filterJarak
            });
            this.setState({searchWisata: false});
        } else {
            this.setState({searchOpen: false});
        }
    }

    async loadMore() {
        const {totalPage} = this.props.wisataList;
        const {myLoc, keyword, filterHargaDari, filterHargaSampai, filterRating, filterJarak} = this.state;
        if (this.state.page < totalPage) {
            await this.setState({page: this.state.page + 1, onLoadMore: true});
            await this.props.fetchWisataPerpage({
                myLoc,
                keyword,
                page: this.state.page,
                filterHargaDari,
                filterHargaSampai,
                filterRating,
                filterJarak
            });
        }
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 4
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

    closeSearch() {
        this.setState({searchOpen: false});
    }

    render() {
        const {wisataList} = this.props;
        return (
            <View style={{
                flex: 1
            }}>
                <ProgressDialog
                    visible={this.state.searchWisata}
                    message="Mencari wisata..."
                />
                <ProgressDialog
                    visible={this.state.onFiltering}
                    message="Filtering..."
                />
                <Toolbar
                    isSearchActive={this.state.searchOpen}
                    leftElement="menu"
                    centerElement="INIWISATA"
                    searchable={{
                        onSubmitEditing: this.cariWisata.bind(this),
                        onSearchPressed: () => {this.setState({searchOpen: true})},
                        autoFocus: true,
                        placeholder: 'Cari tempat wisata',
                        onChangeText: keyword => this.setState({keyword})
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
                            onRefresh={this.refreshList.bind(this)}
                            refreshing={this.state.onRefresh}
                        />
                    )
                }
                <View>
                    <ActionButton
                        onPress={() => this.props.navigation.navigate({
                            routeName: 'Filter',
                            params: {
                                keyword: this.state.keyword,
                                myLoc: this.state.myLoc
                            }
                        })}
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
    filter: state.filter,
    wisataList: state.wisataList,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    clearFilter: () => dispatch(clearFilter()),
    fetchWisataPerpage: (value) => dispatch(fetchWisataPerpage(value)),
    clearWisataList: () => dispatch(clearWisataList()),
    fetchCariWisata: (value) => dispatch(fetchCariWisata(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(BerandaScreen);

import React from 'react';
import {View, Text, ScrollView, TextInput, CheckBox, Dimensions, StyleSheet, Switch} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import {Button} from 'native-base';
import {iniwisata_primary, iniwisata_primary_dark, iniwisata_star_active, iniwisata_star_deactive} from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {addFilter, clearFilter} from "../redux/actions/filter";
import {fetchCariWisata} from "../redux/actions/wisataList";
import {Button as ButtonMaterial} from 'react-native-material-ui';

class FilterScreen extends React.Component {
    constructor(props) {
        super(props);
        const {filterHargaDari, filterHargaSampai, filterRating, filterJarak} = this.props.filter;
        const {myLoc, keyword} = this.props.navigation.state.params;

        this.state = {
            myLoc,
            keyword,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak,

            gratis: false
        }
    }

    componentWillMount() {
        const {filterHargaDari, filterHargaSampai} = this.props.filter;
        filterHargaDari == 0 && filterHargaSampai == 0 ? this.setState({gratis: true}) : null;
    }

    async setFilter() {
        const {
            myLoc,
            keyword,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        } = this.state;

        await this.props.addFilter(this.state);
        await this.props.fetchCariWisata({
            myLoc,
            keyword,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        });
        this.props.navigation.navigate('Beranda');
    }

    render() {
        const {width} = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="close"
                    rightElement={
                        <ButtonMaterial
                            text="reset"
                            style={{ text: { color: 'white' } }}
                            onPress={() => {
                                this.setState({
                                    filterHargaDari: 0,
                                    filterHargaSampai: 1000000,
                                    filterRating: 0,
                                    filterJarak: 0,
                                    gratis: false
                                })
                            }}
                        />
                    }
                    onLeftElementPress={() => {this.props.navigation.goBack()}}
                />
                <ScrollView>
                    <View style={{
                        margin: 15
                    }}>
                        <View
                            style={{
                                borderBottomWidth: 0.5,
                                paddingBottom: 10
                            }}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Jarak Wisata</Text>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'center'
                            }}>
                                <Button
                                    disabled={this.state.filterJarak == 0 || this.state.filterJarak == null}
                                    rounded
                                    icon
                                    transparent
                                    onPress={() => {
                                        this.setState({filterJarak: this.state.filterJarak-5});
                                    }}
                                >
                                    <Icon name="md-remove-circle" size={30} color={iniwisata_primary_dark}/>
                                </Button>
                                <View
                                    style={{
                                        flexGrow: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            fontSize: 18
                                        }}
                                        editable={false}
                                        value={this.state.filterJarak == 0 ? 'Jarak tempat wisata' : this.state.filterJarak.toString()}
                                    />
                                </View>
                                <Button
                                    disabled={this.state.filterJarak == 50}
                                    rounded
                                    icon
                                    transparent
                                    onPress={() => {
                                        this.setState({filterJarak: this.state.filterJarak+5});
                                    }}
                                >
                                    <Icon name="md-add-circle" size={30} color={iniwisata_primary_dark}/>
                                </Button>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 0.5,
                                paddingBottom: 10,
                                marginTop: 15
                            }}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Harga Tiket</Text>
                            {
                                !this.state.gratis ? (
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 1
                                        }}>
                                            <View style={[styles.textInputContainer, {width: width/2-10}]}>
                                                <Text style={styles.headText}>Dari</Text>
                                                <TextInput
                                                    editable={false}
                                                    style={styles.textInput}
                                                    value={this.state.filterHargaDari.toLocaleString()}
                                                />
                                            </View>
                                            <View
                                                width={10}
                                            />
                                            <View style={styles.textInputContainer}>
                                                <Text style={styles.headText}>Hingga</Text>
                                                <TextInput
                                                    editable={false}
                                                    style={styles.textInput}
                                                    value={this.state.filterHargaSampai.toLocaleString()}
                                                />
                                            </View>
                                        </View>
                                        <View style={{
                                            marginTop: 10,
                                            alignItems: 'center'
                                        }}>
                                            <MultiSlider
                                                sliderLength={width-50}
                                                values={[this.state.filterHargaDari, this.state.filterHargaSampai]}
                                                onValuesChange={value => this.setState({
                                                    filterHargaDari: value[0],
                                                    filterHargaSampai: value[1]
                                                })}
                                                min={0}
                                                max={1000000}
                                                step={50000}
                                                allowOverlap
                                                snapped
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <View
                                        height={10}
                                    />
                                )
                            }
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 0,
                                padding: 0
                            }}>
                                <Switch
                                    value={this.state.gratis}
                                    onValueChange={gratis => {
                                        const harga = gratis ? [0,0] : [0, 1000000];
                                        this.setState({
                                            gratis,
                                            filterHargaDari: harga[0],
                                            filterHargaSampai: harga[1]
                                        });
                                    }}
                                />
                                <Text>Tampilkan hanya tiket gratis</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                borderBottomWidth: 0.5,
                                paddingBottom: 10,
                                marginTop: 15,
                            }}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Rating Wisata</Text>
                            <View style={{
                                margin: 20
                            }}>
                                <StarRating
                                    fullStarColor={iniwisata_star_active}
                                    emptyStarColor={iniwisata_star_deactive}
                                    emptyStar="star"
                                    rating={this.state.filterRating}
                                    selectedStar={value => {
                                        this.state.filterRating == value ? this.setState({filterRating: this.state.filterRating-1}) : this.setState({filterRating: value});
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        padding: 20
                    }}
                >
                    <Button
                        block
                        style={{
                            backgroundColor: iniwisata_primary_dark
                        }}
                        onPress={this.setFilter.bind(this)}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>FILTER</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    textInputContainer: {
        width: width/2,
        marginTop: 10
    },
    headText: {
        fontSize: 12
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 2,
        paddingHorizontal: 0,
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => ({
    filter: state.filter
});

const mapDispatchToProps = dispatch => ({
    clearFilter: () => dispatch(clearFilter()),
    addFilter: filter => dispatch(addFilter(filter)),
    fetchCariWisata: (value) => dispatch(fetchCariWisata(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);

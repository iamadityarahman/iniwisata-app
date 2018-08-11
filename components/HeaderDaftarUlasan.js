import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RatingDiagram from "./RatingDiagram";
import StarRating from "react-native-star-rating";
import {connect} from 'react-redux';

class HeaderDaftarUlasan extends Component{
    render() {
        return (
            <View>
                <RatingDiagram/>
                {
                    this.props.commentAble ? (
                        <View style={styles.tambahUlasanContainer}>
                            <Text style={styles.ulasanText}>Tambah Ulasan:</Text>
                            <StarRating
                                selectedStar={star => {
                                    this.props.navigation.navigate({
                                        routeName: 'TambahUlasan',
                                        params: {rating: star}
                                    });
                                }}
                            />
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tambahUlasanContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        marginBottom: 20
    },
    ulasanText: {
        marginBottom: 10,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => ({
    commentAble: state.wisataOpen.commentAble
});

export default connect(mapStateToProps)(HeaderDaftarUlasan);

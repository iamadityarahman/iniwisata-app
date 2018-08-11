import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {iniwisata_primary_dark, iniwisata_star_active, iniwisata_star_deactive} from "../color";
import {connect} from 'react-redux';
import {fetchAll, fetchCommentAble} from "../redux/actions/wisataOpen";
import StarRating from 'react-native-star-rating';
import IconFA from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const RatingWisata = (props) => (
    <View style={styles.ratingContainer}>
        <IconFA name="circle" size={3} style={{marginHorizontal: 5}}/>
        <Text>{props.rating.toFixed(2)}&nbsp;</Text>
        <StarRating
            disabled={true}
            rating={Math.round(props.rating)}
            starSize={14}
            emptyStar='star'
            emptyStarColor={iniwisata_star_deactive}
            fullStarColor={iniwisata_star_active}
        />
    </View>
);

class CardWisata extends React.Component {
    async _pressSelengkapnya() {
        await this.props.navigation.navigate({
            routeName: 'Detail',
            key: 'listWisata'
        });
        await this.props.closeSearch();
        await this.props.fetchCommentAble(this.props.id, this.props.user.id);
        this.props.fetchAll(this.props.id);
    }

    render() {
        return (
            <Card style={styles.card}>
                <CardImage source={{uri: this.props.gambar}}/>
                <CardTitle title={this.props.nama_tempat.toUpperCase()} style={{
                    marginTop: -10
                }}/>
                <CardContent>
                    <View style={styles.contentContainer}>
                        <Text>
                            {this.props.tiket_masuk == 0 ? 'Gratis' : `Rp. ${this.props.tiket_masuk.toLocaleString()}`}
                        </Text>
                        <IconFA name="circle" size={3} style={{marginHorizontal: 5}}/>
                        <Text style={{color: this.props.buka ? 'green' : 'red'}}>
                            {this.props.buka ? 'Buka' : 'Tutup'}&nbsp;
                        </Text>
                        <Text>
                            ({this.props.jam_buka.trim()})
                        </Text>
                        {this.props.rating == null ? <RatingWisata rating={0}/> : <RatingWisata rating={this.props.rating}/>}
                    </View>
                    <Text>{this.props.alamat}</Text>
                </CardContent>
                <CardAction separator={true} inColumn={false}>
                    <CardButton
                        onPress={this._pressSelengkapnya.bind(this)}
                        title="Selengkapnya"
                        color={iniwisata_primary_dark}
                    />
                </CardAction>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchAll: id_wisata => dispatch(fetchAll(id_wisata)),
    fetchCommentAble: (id_wisata, id_user) => dispatch(fetchCommentAble(id_wisata, id_user))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardWisata);

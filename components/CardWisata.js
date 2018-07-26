import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {INIWISATA_TUA, WARNA_RATING_ON} from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const hari = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
const dateNow = new Date();

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginVertical: 7
    },
    cardTitleStyle: {
        paddingTop: 0,
        margin: 0
    },
    ratingStyle: {
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
    },
    bukaTutup: {
        borderRadius: 10,
        padding: 2,
        paddingHorizontal: 8,
        height: 25,
        marginHorizontal: 15,
        marginTop: 2
    },
    bukaTutupText: {
        fontSize: 15,
        color: 'white',
    }
});

const Badge = (props) => {
    if (props.status === 'buka') {
        return (
            <View style={[styles.bukaTutup, {backgroundColor: 'green'}]}>
                <Text style={styles.bukaTutupText}>BUKA</Text>
            </View>
        );
    } else {
        return (
            <View style={[styles.bukaTutup, {backgroundColor: 'red'}]}>
                <Text style={styles.bukaTutupText}>TUTUP</Text>
            </View>
        );
    }
};

const RatingWisata = (props) => props.rating !== null ? (
    <Text>
        <Icon name="md-star" size={35} color={WARNA_RATING_ON} style={styles.ratingStyle} />
        &nbsp;{props.rating.toFixed(2)}
    </Text>
) : null;

const BukaTutup = (props) => {
    const hariIni = hari[dateNow.getDay()];
    if (props[hariIni] === '24 Jam') {
        return (<Badge status="buka"/>);
    } else {
        if (cekKondisi(props[hariIni])) {
            return (<Badge status="buka"/>);
        } else {
            return (<Badge status="tutup"/>);
        }
    }
};

const cekKondisi = (waktuOperasi) => {
    const jamNow = moment().format('HH.mm');
    const hilangSpasi = waktuOperasi.split(' ').join('');
    const mulaiSampai = hilangSpasi.split('-');

    const timeNow = moment.unix(jamNow, 'HH.mm').valueOf();
    const timeBuka = moment.unix(mulaiSampai[0], 'HH.mm').valueOf();
    const timeTutup = moment.unix(mulaiSampai[1], 'HH.mm').valueOf();

    if (timeNow >= timeBuka && timeNow <= timeTutup) {
        return true;
    } else {
        return false;
    }
};

export default class CardWisata extends React.Component {
    render() {
        return (
            <Card style={styles.card}>
                <CardImage
                    source={{uri: `http://10.0.2.2:3030/wisata/thumbnail/${this.props.gambar}`}}
                    title={<RatingWisata rating={this.props.rating}/>}
                />
                <View style={{flexDirection: 'row'}}>
                    <CardTitle
                        title={this.props.nama_tempat.toUpperCase()}
                        style={styles.cardTitleStyle}
                    />
                    <BukaTutup {...this.props} />
                </View>
                <CardContent text={this.props.alamat} />
                <CardAction
                    separator={true}
                    inColumn={false}
                >
                    <CardButton
                        onPress={() => {this.props.navigation.navigate({
                            routeName: 'Detail',
                            params: {
                                nama_tempat: this.props.nama_tempat,
                                alamat: this.props.alamat,
                                gambar: this.props.gambar,
                                id: this.props.id,
                                lat: this.props.lat,
                                lng: this.props.lng
                            },
                            key: 'listWisata'
                        })}}
                        title="Selengkapnya"
                        color={INIWISATA_TUA}
                    />
                </CardAction>
            </Card>
        );
    }
}

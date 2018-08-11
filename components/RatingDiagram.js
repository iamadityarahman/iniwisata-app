import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Bar} from 'react-native-progress';
import {connect} from 'react-redux';

const RatingBar = props => (
    <Bar
        width={null}
        borderWidth={0}
        borderRadius={0}
        {...props}
        height={16}
        style={{
            margin: 2
        }}
    />
);

class RatingDiagram extends React.Component {
    render() {
        const {
            rata,
            total_rata,
            persen_satu,
            persen_dua,
            persen_tiga,
            persen_empat,
            persen_lima
        } = this.props.rating;

        return (
            <View style={styles.container}>
                <View style={styles.containerRata}>
                    <Text style={styles.textRata}>{rata.toFixed(1)}</Text>
                    <Text style={styles.textTotalRata}>
                        <Icon name="md-person"/>&nbsp;
                        {total_rata}
                    </Text>
                </View>
                <View style={styles.containerLabel}>
                    <Text>5&nbsp;<Icon name="md-star"/></Text>
                    <Text>4&nbsp;<Icon name="md-star"/></Text>
                    <Text>3&nbsp;<Icon name="md-star"/></Text>
                    <Text>2&nbsp;<Icon name="md-star"/></Text>
                    <Text>1&nbsp;<Icon name="md-star"/></Text>
                </View>
                <View style={styles.containerBar}>
                    <RatingBar progress={persen_lima} color="#57bb8a"/>
                    <RatingBar progress={persen_empat} color="#9ace6a"/>
                    <RatingBar progress={persen_tiga} color="#ffcf02"/>
                    <RatingBar progress={persen_dua} color="#ff9f02"/>
                    <RatingBar progress={persen_satu} color="#ff6f31"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    containerRata: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    textRata: {
        fontSize: 50,
        margin: 0,
        padding: 0
    },
    containerLabel: {
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 5
    },
    textTotalRata: {
        margin: 0,
        padding: 0
    },
    containerBar: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingLeft: 0
    }
});

const mapStateToProps = state => ({
    rating: state.wisataOpen.rating
});

export default connect(mapStateToProps)(RatingDiagram);

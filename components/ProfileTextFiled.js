import React from 'react';
import {iniwisata_primary_dark} from "../color";
import {TextInput, View, Text, StyleSheet} from "react-native";

class ProfileTextFiled extends React.Component {
    render() {
        return (
            <View style={styles.textInputContainer}>
                <Text style={styles.headText}>{this.props.title}</Text>
                <TextInput {...this.props} style={styles.textInput} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginVertical: 10
    },
    headText: {
        fontSize: 12,
        color: iniwisata_primary_dark,
        fontWeight: 'bold'
    },
    textInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: iniwisata_primary_dark
    }
});

export default ProfileTextFiled

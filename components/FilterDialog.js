import React, {Component} from 'react';
import ConfirmDialog from "react-native-simple-dialogs/src/ConfirmDialog";
import {Text, View} from "react-native";
import RadioGroup from "react-native-flexi-radio-button/lib/radioGroup";
import {iniwisata_primary_dark} from "../color";
import RadioButton from "react-native-flexi-radio-button/lib/radioButton";

class FilterDialog extends Component {
    render() {
        let filterNow;
        switch (JSON.stringify(this.props.valueNow)) {
            case '[0,99000]':filterNow = 1;break;
            case '[100000,200000]':filterNow = 2;break;
            case '[200000,300000]':filterNow = 3;break;
            case '[300001,1000000]':filterNow = 4;break;
            default: filterNow = 0;
        }

        return (
            <ConfirmDialog
                title="Filter Harga Tiket"
                visible={this.props.visible}
                onTouchOutside={() => this.setState({dialogVisible: false})}
                negativeButton={this.props.negativeButton}
                positiveButton={this.props.positiveButton}
            >
                <View>
                    <RadioGroup
                        color={iniwisata_primary_dark}
                        onSelect={this.props.onSelect}
                        selectedIndex={filterNow}
                    >
                        <RadioButton
                            value={{filterHargaDari: 0, filterHargaSampai: 1000000}}
                        >
                            <Text>Semua</Text>
                        </RadioButton>
                        <RadioButton
                            value={{filterHargaDari: 0, filterHargaSampai: 99000}}
                        >
                            <Text>&lt; 100.000</Text>
                        </RadioButton>
                        <RadioButton
                            value={{filterHargaDari: 100000, filterHargaSampai: 200000}}
                        >
                            <Text>100.000 - 200.000</Text>
                        </RadioButton>
                        <RadioButton
                            value={{filterHargaDari: 200000, filterHargaSampai: 300000}}
                        >
                            <Text>200.000 - 300.000</Text>
                        </RadioButton>
                        <RadioButton
                            value={{filterHargaDari: 300001, filterHargaSampai: 1000000}}
                        >
                            <Text>&gt; 300.000</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>
            </ConfirmDialog>
        );
    }
}

export default FilterDialog;

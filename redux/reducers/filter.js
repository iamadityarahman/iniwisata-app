import {ADDFILTER, CLEARFILTER} from "../actions/filter";

const initialState = {
    filterHargaDari: 0,
    filterHargaSampai: 1000000,
    filterRating: 0,
    filterJarak: 0
};

export const filter = (state = initialState, actions) => {
    switch (actions.type) {
        case ADDFILTER:
            return {
                filterHargaDari: actions.filter.filterHargaDari,
                filterHargaSampai: actions.filter.filterHargaSampai,
                filterRating: actions.filter.filterRating,
                filterJarak: actions.filter.filterJarak
            };

        case CLEARFILTER:
            return initialState;

        default:
            return state;
    }
};

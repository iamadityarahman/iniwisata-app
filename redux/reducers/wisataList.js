import {ADDPERPAGE, CLEARALLWISATA, SETLOADMORE} from "../actions/wisataList";

const initialState = {
    onLoadMore: false,
    isLoading: true,
    total_pencarian: 0,
    total_page: 0,
    last_page: 0,
    data: []
};

export const wisataList = (state = initialState, action) => {
    switch (action.type) {
        case SETLOADMORE:
            return {
                ...state,
                onLoadMore: action.kondisi
            };

        case ADDPERPAGE:
            return {
                onLoadMore: true,
                isLoading: false,
                total_pencarian: action.total_pencarian,
                total_page: action.total_page,
                last_page: action.page,
                data: [
                    ...state.data,
                    ...action.data
                ]
            };

        case CLEARALLWISATA:
            return initialState;

        default:
            return state;
    }
};

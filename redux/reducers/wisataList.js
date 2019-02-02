import {ADDPERPAGE, CLEARALLWISATA, SETLOADMORE} from "../actions/wisataList";

const initialState = {
    onLoadMore: false,
    isLoading: true,
    totalPencarian: 0,
    totalPage: 0,
    lastPage: 0,
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
                totalPencarian: action.totalPencarian,
                totalPage: action.totalPage,
                lastPage: action.page,
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

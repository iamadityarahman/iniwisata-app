import {
    ALL,
    CLEARWISATAOPEN,
    COMMENTABLE,
    DETAILWISATA,
    FASILITAS, GALERI,
    ISLOADING,
    JADWAL,
    RATING,
    ULASAN
} from "../actions/wisataOpen";

const initialState = {
    isLoading: true,
    commentAble: true
};

export const wisataOpen = (state = initialState, actions) => {
    switch (actions.type) {
        case RATING:
            return {
                ...state,
                rating: actions.data
            };

        case ULASAN:
            return {
                ...state,
                ulasan: actions.data
            };

        case DETAILWISATA:
            return {
                ...state,
                detailWisata: actions.data
            };

        case FASILITAS:
            return {
                ...state,
                fasilitas: actions.data
            };

        case JADWAL:
            return {
                ...state,
                jadwal: actions.data
            };

        case ALL:
            return {
                ...state,
                ...actions.data
            };

        case ISLOADING:
            return {
                ...state,
                isLoading: actions.kondisi
            };

        case COMMENTABLE:
            return {
                ...state,
                commentAble: actions.kondisi
            };

        case GALERI:
            return {
                ...state,
                galeri: actions.data
            };

        case CLEARWISATAOPEN:
            return initialState;

        default:
            return initialState;
    }
};

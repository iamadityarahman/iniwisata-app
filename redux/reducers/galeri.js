import {BERSIHKAN_GALERI, MASUKAN_GALERI} from "../actions/galeri";

export const galeri = (state = [], action) => {
    switch (action.type) {
        case MASUKAN_GALERI:
            return [
                ...state,
                ...action.data
            ];


        case BERSIHKAN_GALERI:
            return [];

        default:
            return state;
    }
};

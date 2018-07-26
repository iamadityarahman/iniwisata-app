import {BERSIHKAN_WISATA, TAMBAH_WISATA} from "../actions/wisata";

export const wisata = (state = [], action) => {
    switch (action.type) {
        case TAMBAH_WISATA:
            return [
                ...state,
                ...action.data
            ];

        case BERSIHKAN_WISATA:
            return [];

        default:
            return state;
    }
};

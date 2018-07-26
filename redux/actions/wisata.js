import axios from 'axios';

export const TAMBAH_WISATA = 'TAMBAH_WISATA';
export const BERSIHKAN_WISATA = 'BERSIHKAN_WISATA';

export const tambahWisata = data => ({
    type: TAMBAH_WISATA,
    data
});

export const bersihkanWisata = () => ({type: BERSIHKAN_WISATA});

export const ambilSemuaWisata = () => async dispatch => {
    try {
        const wisata = await axios.get('/wisata');
        await dispatch(bersihkanWisata());
        dispatch(tambahWisata(wisata.data));
        return wisata.length;
    } catch (e) {
        console.log(e);
    }
};

export const cariWisata = (keyword) => async dispatch => {
    try {
        if (keyword != '') {
            const wisata = await axios.get(`/wisata/cari/${keyword}`);
            await dispatch(bersihkanWisata());
            dispatch(tambahWisata(wisata.data));
        } else {
            dispatch(ambilSemuaWisata());
        }
    } catch (e) {
        console.error(e);
    }
};

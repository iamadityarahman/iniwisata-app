import axios from 'axios';

export const MASUKAN_GALERI = 'MASUKAN_GALERI';
export const BERSIHKAN_GALERI = 'BERSIHKAN_GALERI';

export const masukanGaleri = data => ({
    type: MASUKAN_GALERI,
    data
});

export const bersihkanGaleri = () => ({
    type: BERSIHKAN_GALERI
});

export const ambilGaleri = id => async dispatch => {
    try {
        const galeri = await axios.get(`/wisata/galeri/${id}`);
        dispatch(bersihkanGaleri());
        dispatch(masukanGaleri(galeri.data));
    } catch (e) {
        console.error(e);
    }
};



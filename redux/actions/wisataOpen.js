import axios from 'axios';

export const RATING = 'RATING';
export const ULASAN = 'ULASAN';
export const CLEARWISATAOPEN = 'CLEARWISATAOPEN';
export const DETAILWISATA = 'DETAILWISATA';
export const FASILITAS = 'FASILITAS';
export const JADWAL = 'JADWAL';
export const ALL = 'ALL';
export const ISLOADING = 'ISLOADING';
export const COMMENTABLE = 'COMMENTABLE';
export const GALERI = 'GALERI';

export const rating = data => ({
    type: RATING,
    data
});

export const ulasan = data => ({
    type: ULASAN,
    data
});

export const detailWisata = data => ({
    type: DETAILWISATA,
    data
});

export const fasilitas = data => ({
    type: FASILITAS,
    data
});

export const jadwal = data => ({
    type: JADWAL,
    data
});

export const all = data => ({
    type: ALL,
    data
});

export const isLoading = kondisi => ({
    type: ISLOADING,
    kondisi
});

export const commentAble = kondisi => ({
    type: COMMENTABLE,
    kondisi
});

export const galeri = data => ({
    type: GALERI,
    data
});

export const clearWisataOpen = () => ({type: CLEARWISATAOPEN});

export const fetchRating = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/rating/${id}`);
        dispatch(rating(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchUlasan = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/ulasan/${id}`);
        dispatch(ulasan(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchDetailWisata = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/${id}`);
        dispatch(detailWisata(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchFasilitas = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/fasilitas/${id}`);
        dispatch(fasilitas(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchJadwal = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/operasional/${id}`);
        dispatch(jadwal(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchCommentAble = (id_wisata, id_user) => async discpatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/ulasan/${id_wisata}/${id_user}`);
        discpatch(commentAble(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchGaleri = id => async dispatch => {
    try {
        const {data} = await axios(`/iniwisata/wisata/galeri/${id}`);
        dispatch(galeri(data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchAll = id => async dispatch => {
    try {
        const rating = await axios(`/iniwisata/wisata/rating/${id}`);
        const ulasan = await axios(`/iniwisata/wisata/ulasan/${id}`);
        const detail = await axios(`/iniwisata/wisata/${id}`);
        const fasilitas = await axios(`/iniwisata/wisata/fasilitas/${id}`);
        const jadwal = await axios(`/iniwisata/wisata/operasional/${id}`);
        const galeri = await axios(`/iniwisata/wisata/galeri/${id}`);

        await dispatch(all({
            rating: rating.data,
            ulasan: ulasan.data,
            detailWisata: detail.data,
            fasilitas: fasilitas.data,
            jadwal: jadwal.data,
            galeri: galeri.data
        }));

        dispatch(isLoading(false));
    } catch (e) {
        console.error(e);
    }
};

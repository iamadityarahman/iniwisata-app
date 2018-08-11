import axios from 'axios';

export const ADDPERPAGE = 'ADDPERPAGE';
export const CLEARALLWISATA = 'CLEARALLWISATA';
export const SETLOADMORE = 'SETLOADMORE';

export const addPerpage  = ({total_pencarian, total_page, data, page}) => ({
    type: ADDPERPAGE,
    total_pencarian,
    total_page,
    data,
    page
});

export const clearWisataList = () => ({
    type: CLEARALLWISATA
});

export const setLoadMore = kondisi => ({
    type: SETLOADMORE,
    kondisi
});

export const fetchWisataPerpage = (keyword, page, filterHargaDari, filterHargaSampai) => async dispatch => {
    try {
        await dispatch(setLoadMore(true));
        const {data} = await axios.post('/iniwisata/wisata', {keyword, page, filterHargaDari, filterHargaSampai});
        await dispatch(addPerpage(data));
        await dispatch(setLoadMore(false));
    } catch (e) {
        console.error(e);
    }
};

export const fetchCariWisata = (keyword, filterHargaDari, filterHargaSampai) => async dispatch => {
    try {
        const {data} = await axios.post('/iniwisata/wisata', {keyword, page: 1, filterHargaDari, filterHargaSampai});
        await dispatch(clearWisataList());
        await dispatch(addPerpage(data));
        await dispatch(setLoadMore(false));
    } catch (e) {
        console.error(e);
    }
};

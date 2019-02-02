import axios from 'axios';

export const ADDPERPAGE = 'ADDPERPAGE';
export const CLEARALLWISATA = 'CLEARALLWISATA';
export const SETLOADMORE = 'SETLOADMORE';

export const addPerpage  = ({totalPencarian, totalPage, data, page}) => ({
    type: ADDPERPAGE,
    totalPencarian,
    totalPage,
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

export const fetchWisataPerpage = ({myLoc, keyword, page, filterHargaDari, filterHargaSampai, filterRating, filterJarak}) => async dispatch => {
    try {
        await dispatch(setLoadMore(true));
        const {data} = await axios.post('/iniwisata/wisata', {
            myLoc,
            keyword,
            page,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        });
        await dispatch(addPerpage(data));
        await dispatch(setLoadMore(false));
    } catch (e) {
        console.error(e);
    }
};

export const fetchCariWisata = ({myLoc, keyword, filterHargaDari, filterHargaSampai, filterRating, filterJarak}) => async dispatch => {
    try {
        const {data} = await axios.post('/iniwisata/wisata', {
            myLoc,
            keyword,
            page: 1,
            filterHargaDari,
            filterHargaSampai,
            filterRating,
            filterJarak
        });
        await dispatch(clearWisataList());
        await dispatch(addPerpage(data));
        await dispatch(setLoadMore(false));
    } catch (e) {
        console.error(e);
    }
};

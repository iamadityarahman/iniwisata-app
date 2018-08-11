import axios from 'axios';

export const SAVE = 'SAVE';
export const CLEAR = 'CLEAR';

export const save = data => ({
    type: SAVE,
    data
});

export const clearUser = () => ({type: CLEAR});

export const fetchDataUser = token => async dispatch => {
    try {
        const {data} = await axios.post('/iniwisata/token/decode', {token});
        dispatch(save(data));
    } catch (e) {
        console.error(e);
    }
};

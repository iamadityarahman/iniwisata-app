export const ADDFILTER = 'ADDFILTER';
export const CLEARFILTER = 'CLEARFILTER';

export const addFilter = filter => ({
    type: ADDFILTER,
    filter
});

export const clearFilter = () => ({
    type: CLEARFILTER
});

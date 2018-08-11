import {SAVE, CLEAR} from "../actions/user";

export const user = (state = {}, actions) => {
    switch (actions.type) {
        case SAVE:
            return actions.data;

        case CLEAR:
            return {};

        default:
            return state;
    }
};

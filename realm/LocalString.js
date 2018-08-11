import Realm from 'realm';

const LOCALSTRING = 'LocalString';

const localStringSchema = {
    name: LOCALSTRING,
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string'
    }
};

const realm = new Realm({schema: [localStringSchema]});

export const countLocalString = () => {
    return realm.objects(LOCALSTRING).length;
};

export const setLocalString = (key, value) => {
    try {
        realm.write(() => {
            realm.create(LOCALSTRING, {
                key, value
            });
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const getLocalString = key => {
    let data =  realm.objects(LOCALSTRING).filtered(`key = '${key}'`);
    if (data.length > 0) {
        return data[0].value;
    } else {
        return null;
    }

};

export const clearLocalString = () => {
    realm.write(() => {
        realm.delete(realm.objects(LOCALSTRING));
    });
};

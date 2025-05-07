export const StorageService = {
    getItem (storageKey){
        const value = JSON.parse(localStorage.getItem(storageKey));
        return value;
    },

    setItem(storageKey, value){
        return localStorage.setItem(storageKey, JSON.stringify(value));
    },

    removeItem (storageKey){
        return localStorage.removeItem(storageKey);
    }
};

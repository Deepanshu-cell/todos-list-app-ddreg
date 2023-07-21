export const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getDataFromLocalStorage = (key) => {
    let temp = (localStorage.getItem(key));
    if (temp) {
        return JSON.parse(temp);
    }
}
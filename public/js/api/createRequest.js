/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('error', (err) => options.callback(err, {}));
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            options.callback(null, JSON.parse(xhr.responseText));
        }
    });

    let url = options.url;
    let formData;
    const dataKeys = Object.keys(options.data || {});
    if (options.method == 'GET') {
        dataKeys.forEach((key, index) => {
            url += index == 0 ? '?' : '&';
            url += `${key}=${options.data[key]}`;
        });
    } else {
        formData = new FormData();
        dataKeys.forEach((key) => {
            formData.append(key, options.data[key]);
        });
    }
    xhr.open(options.method, url);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(formData || '');
};

const postData = async (url, data) => { // data - данные уходящие на сервер
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text(); // res.text() серверный файл возвращает текстовые данные
};

const getResource = async (url) => { // data - данные уходящие на сервер
    let res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};
export function fetchData(status: 0 | 1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            status ? resolve(status) : reject(status);
        }, 1000);
    });
}

export function fetchSuccess() {
    return fetchData(1);
}

export function fetchError() {
    return fetchData(0);
}
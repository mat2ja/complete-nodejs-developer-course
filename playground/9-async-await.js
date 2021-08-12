const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(9, 100)
    return sum
}



doWork()
    .then(res => console.log('res:', res))
    .catch(e => console.log('e: ', e))
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            reject('No negative numbers, bitch!')
        }
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
};

const doWork = async () => {
    const sum = await add(1, 99)
    const sum2 = await add(sum, -50)
    const sum3 = await add(sum2, 3)
    return sum3
}

doWork()
    .then(res => console.log('res:', res))
    .catch(e => console.log('e: ', e))
const doWork = async () => {
    return 'bitcoin'
}

console.log(doWork());

doWork()
    .then(res => console.log(res))
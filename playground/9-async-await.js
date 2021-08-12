const doWork = async () => {
    // throw new Error('Something went crauuzy')
    return 'bitcoin'
}

doWork()
    .then(res => console.log('res:', res))
    .catch(e => console.log('e: ', e))
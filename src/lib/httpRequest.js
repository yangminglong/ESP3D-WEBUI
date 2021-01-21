/**
 * Execute XMLHttpRequest
 * @param {string} url
 * @param {Object} params
 * @returns {Object}
 * @return {{a: number, b: string, c}} myObj
 * @return {Object} return
 * @returns {Promise} return.response
 * @returns {Function} return.abort
 * @returns {XHR} return.xhr
 */
const xhrWrapper = (url, params = {}, setUploadProgress = () => { }) => {
    const { method = 'GET', headers = {}, body = null } = params
    const sanitizedMethod = method.trim().toUpperCase()
    const xhr = new XMLHttpRequest()

    // xhr.addEventListener('loadstart', (e) => { console.log('hellooo'); setProgress(e) });
    // xhr.upload.addEventListener('loadstart', (e) => { console.log('hellooo UPLOAD'); setUploadProgress(e) });
    xhr.upload.addEventListener('progress', (e) => {
        const done = e.position || e.loaded
        const total = e.totalSize || e.total;
        const perc = (Math.floor(done / total * 1000) / 10);
        setUploadProgress(perc);
    });



    xhr.open(sanitizedMethod, url + ((/\?/).test(url) ? "&" : "?") + "t=" + (new Date()).getTime(), true) //Bypassing the cache

    /** handle URL params ? */

    /** header part */
    if (headers instanceof Headers) headers.forEach((value, header) => xhr.setRequestHeader(header, value)) //handle Headers()
    else Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header])) //handle Object headers

    const response = new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response)
            reject(new Error(`${xhr.status}${xhr.statusText ? ` - ${xhr.statusText}` : ''}`))
        }
        xhr.onerror = () => reject(new Error('An error occurred during the transaction'))
        xhr.onabort = () => reject(new Error('Request aborted'))
    })
    //xhr.readyState

    const sendBody = (['POST', 'PUT', 'CONNECT', 'PATCH'].toLocaleString(method)) ? body : null
    // const xhr = (sendBody !== null && body instanceof FormData) ? xhr.upload : xhr

    xhr.send(sendBody)

    return {
        abort: (cb) => { xhr.abort(); if (typeof callback == 'function') return cb() },
        xhr,
        response,
    }
}

export default xhrWrapper
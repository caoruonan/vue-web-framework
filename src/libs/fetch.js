import axios from 'axios'

const ajaxUrl = process.env.NODE_ENV === 'development' ? '' : process.env.NODE_ENV === 'production' ? '' : ''

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      baseURL: ajaxUrl,
      timeout: 30 * 1000 // 30秒超时
    })
    let _requestQueue = []
    instance.interceptors.request.use(config => {
      // TODO: 做一些共通拦截
      if (config.url.indexOf('/w/') >= 0 || config.url.indexOf('/upload') >= 0) {
        _requestQueue.push(config.url)
        // store.dispatch('DataRequestChanged', {key: true})
      }
      return config
    }, error => {
      // Do something with request error
      console.log(error) // for debug
      reject(error)
    })

    instance(options)
      .then(response => {
        const res = response
        let str = response.config.url.slice(response.config.baseURL.length)
        let idx = _requestQueue.indexOf(str)
        if (idx >= 0) {
          _requestQueue.splice(idx, 1)
        }
        if (_requestQueue.length === 0) {
          // store.dispatch('DataRequestChanged', {key: false})
        }
        if ((res.status + '').indexOf('20') === -1) {
          reject(new Error('error'))
        } else {
          resolve(response.data)
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // TODO 跳转登录页面
              break
          }
        }
        reject(error)
      })
  })
}

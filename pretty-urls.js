const www = /^www\./
const hasExt = /\.[A-Za-z0-9]+$/;
const { URL } = require('url');
const indexDocument = 'index.html'

exports.handler = async event => {
    const cf = event.Records[0].cf;
    const host = cf.request.headers.host[0].value.toLowerCase().split('.')
    // if (!www.test(host)) {
    if (host.length < 3 || host[0] !== 'www') {
        return {
            status: '301',
            statusDescription: 'Moved Permanently',
            headers: {
                location: [{
                    key: 'Location',
                    // value: `https://www.${host}${cf.request.uri}`,
                    value
                }],
            }
        };
    }
    if (cf.request.uri.endsWith('/')) {
        return Object.assign({}, cf.request, {uri: `${cf.request.uri}${indexDocument}`});
    }
    if (cf.request.uri.endsWith(`/${indexDocument}`)) {
        return {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: cf.request.uri.substr(0, cf.request.uri.length - indexDocument.length),
                }],
            }
        };
    }
    if (!hasExt.test(cf.request.uri)) { // if uri doesn't have a file extension, assume it's a path without a trailing slash
        return {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: `${cf.request.uri}/`,
                }],
            }
        };
    }
    return cf.request;
}

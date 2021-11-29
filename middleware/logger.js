module.exports = function (req, res, next) {
    const now = new Date();
    const Y = now.getUTCFullYear(),
          M = now.getUTCMonth() + 1,
          D = now.getUTCDate(),
          h = now.getUTCHours(),
          m = now.getUTCMinutes(),
          s = now.getUTCSeconds(),
          tzo = now.getTimezoneOffset(),
          tzs = `UTC${tzo < 0 ? '+' : '-'}${-(tzo / 60)}`;
    const timestamp = `${Y}-${M}-${D} @ ${h}:${m}:${s} ${tzs}`;

    const info = {
        headers: req.headers,
        body: req.body
    };

    console.log(`${timestamp} --> ${req.method} ${req.url}`, info);

    next();
};
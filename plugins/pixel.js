


export default ({$config}) => {
    !function (e, s, t, c, n, a, i, p, d) {
    e[n] || ((i = e[n] = function () {
    i.process ? i.process.apply(i, arguments) : i.queue.push(arguments)
    }).queue =[], i.t = 1 * new Date, (p = s.createElement(t)).async = 1, p.src =$config.pixelUrl+"cds_pixel.min.js?t=" + 864e5 * Math.ceil(new Date / 864e5), (d =
    s.getElementsByTagName(t)[0]).parentNode.insertBefore(p, d))
    }(window, document, "script", 0, "cds_pixel");

};

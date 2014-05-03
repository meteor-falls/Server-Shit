var fs = require('fs');

var template = fs.readFileSync('announcement.template.html', 'utf8'),
    anns = require('./announcement.json'),
    defann = anns.default,
    specs = anns.announcements;

function interpolateAnnouncement(spec) {
    return template
        .replace(/\$name\$/g, spec.name)
        .replace(/\$gradient\$/g, spec.gradient)
        .replace(/\$textcolor\$/g, spec.textcolor)
        .replace(/\$mottocolor\$/g, spec.mottocolor);
}

var len = specs.length,
    spec, ann, i;

console.log('Generating ' + len + ' announcements [' + specs.map(function (val) { return val.name; }).join(' ') + ']');
for (i = 0, len = specs.length; i < len; i += 1) {
    spec = specs[i];
    ann = interpolateAnnouncement(spec);
    if (spec.name === defann) {
        fs.writeFileSync('announcement.html', ann);
    } else {
        fs.writeFileSync('variants/' + spec.name + '.html', ann);
    }
}

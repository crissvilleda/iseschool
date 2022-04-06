export default function repAll(str, old, current) {
    const rep = (str.match(old) || []).length;
    for (var i = 0; i < rep; i++) {
        str = str.replace(old, current);
    }
    return str;
}

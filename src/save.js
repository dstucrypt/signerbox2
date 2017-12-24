import {b64_encode} from 'jkurwa';

function clickLink(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function save(blob, name) {
    clickLink(
        'data:application/octet-stream;base64,' + b64_encode(blob),
        name
    );
}

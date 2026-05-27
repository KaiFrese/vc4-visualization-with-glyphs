('use strict');

document.addEventListener('DOMContentLoaded', async () => {
    const fileReader = new FileReader();

    document.getElementById('file-input').addEventListener('change', () => {
        console.log(document.getElementById('file-input').files[0]);
        fileReader.readAsText(document.getElementById('file-input').files[0]);
    });

    fileReader.addEventListener('load', () => {
        console.log(fileReader.result);
    });
});

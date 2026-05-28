('use strict');

document.addEventListener('DOMContentLoaded', async () => {
    const fileReader = new FileReader();
    let data = [];

    document.getElementById('file-input').addEventListener('change', () => {
        console.log(document.getElementById('file-input').files[0]);
        fileReader.readAsText(document.getElementById('file-input').files[0]);
    });

    fileReader.addEventListener('load', () => {
        data = fileReader.result.split(/\r\n|\n/).map((row) => row.split('\t'));

        //Todo: validate data

        data.shift();

        data.map((row) => {
            row[2] = parseFloat(row[2]) * 0.425;
            row[3] = parseFloat(row[3]);
            row[4] = parseFloat(row[4]) * 16.387;
            row[5] = parseFloat(row[5]);
            row[6] = parseFloat(row[6]) * 0.454;
            row[7] = parseFloat(row[7]);
            row[8] = parseFloat(`19${row[8]}`);
        });
    });
});

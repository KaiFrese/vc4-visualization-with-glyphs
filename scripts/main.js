('use strict');

document.addEventListener('DOMContentLoaded', async () => {
    const fileReader = new FileReader();
    const legendSVG = document.getElementById('legend-svg');
    const chartSVG = document.getElementById('chart-svg');
    let data = [];

    // -1 -> none
    //  0 -> car name
    //  1 -> manufacturer
    //  2 -> consumption
    //  3 -> cylinders
    //  4 -> displacement
    //  5 -> horsepower
    //  6 -> weight
    //  7 -> acceleration
    //  8 -> year
    //  9 -> origin
    let selectedDimensions = {
        xAxis: -1,
        yAxis: -1,
        size: -1,
        color: -1,
        shape: -1,
    };

    document.getElementById('file-input').addEventListener('change', () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput.files.length > 0) {
            fileReader.readAsText(fileInput.files[0]);
        }
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

        drawChart(chartSVG, data, selectedDimensions);
    });

    addChangeHandlerToSelections(chartSVG, data, selectedDimensions);
});

function addChangeHandlerToSelections(chartSVG, data, selectedDimensions) {
    Object.keys(selectedDimensions).forEach((property) =>
        document
            .getElementById(`${property}-select`)
            .addEventListener('change', (event) => {
                selectedDimensions[property] = parseInt(event.target.value);

                drawChart(chartSVG, data, selectedDimensions);
            }),
    );
}

function showDetails(data) {
    //Todo: implement
}

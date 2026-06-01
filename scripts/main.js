('use strict');

document.addEventListener('DOMContentLoaded', async () => {
    const fileReader = new FileReader();
    const chartSVG = document.getElementById('chart-svg');
    const colorDescriptionSVG = document.getElementById(
        'color-description-svg',
    );
    const shapeDescriptionSVG = document.getElementById(
        'shape-description-svg',
    );
    const sizeDescriptionSVG = document.getElementById('size-description-svg');
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
        xAxis: 6,
        yAxis: 2,
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
            row[2] = Math.round(parseFloat(row[2]) * 0.425 * 100) / 100;
            row[3] = parseFloat(row[3]);
            row[4] = Math.round(parseFloat(row[4]) * 16.387 * 100) / 100;
            row[5] = parseFloat(row[5]);
            row[6] = Math.round(parseFloat(row[6]) * 0.454 * 100) / 100;
            row[7] = parseFloat(row[7]);
            row[8] = parseFloat(`19${row[8]}`);
        });

        drawChart(chartSVG, data, selectedDimensions);
    });

    Object.keys(selectedDimensions).forEach((property) =>
        document
            .getElementById(`${property}-select`)
            .addEventListener('change', (event) => {
                selectedDimensions[property] = parseInt(event.target.value);

                drawChart(chartSVG, data, selectedDimensions);
            }),
    );
});

function showDetails(data) {
    data.forEach((value, index) => {
        let unit = '';

        switch (index) {
            case 2:
                unit = ' km/l';
                break;
            case 4:
                unit = ' ccm';
                break;
            case 6:
                unit = ' kg';
                break;
            case 7:
                unit = ' s';
                break;
        }

        document.getElementById(`details-${index}`).innerHTML =
            `${value}${unit}`;
    });
}

function getDimensionLabel(selectedDimension, dimensionIndex) {
    let label = '';

    switch (selectedDimension) {
        case 'color':
            switch (dimensionIndex) {
                case 3:
                    label = 'Zylinder';
                    break;
                case 8:
                    label = 'Jahr';
                    break;
                case 9:
                    label = 'Herkunft';
                    break;
            }

            break;
        case 'shape':
            switch (dimensionIndex) {
                case 3:
                    label = 'Zylinder';
                    break;
                case 9:
                    label = 'Herkunft';
                    break;
            }

            break;
        case 'axis':
            switch (dimensionIndex) {
                case 2:
                    label = 'Verbrauch in km/l';
                    break;
                case 3:
                    label = 'Zylinder';
                    break;
                case 4:
                    label = 'Hubraum in ccm';
                    break;
                case 5:
                    label = 'PS';
                    break;
                case 6:
                    label = 'Gewichtin kg';
                    break;
                case 7:
                    label = 'Beschleunigung in s';
                    break;
                case 8:
                    label = 'Jahr';
                    break;
            }
            break;
        case 'size':
            switch (dimensionIndex) {
                case 2:
                    label = 'Verbrauch in km/l';
                    break;
                case 3:
                    label = 'Zylinder';
                    break;
                case 4:
                    label = 'Hubraum in ccm';
                    break;
                case 5:
                    label = 'PS';
                    break;
                case 6:
                    label = 'Gewicht in kg';
                    break;
                case 7:
                    label = 'Beschleunigung in s';
                    break;
                case 8:
                    label = 'Jahr';
                    break;
            }
            break;
    }

    return label;
}

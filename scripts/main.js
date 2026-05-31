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

    drawChartDescriptions(
        colorDescriptionSVG,
        shapeDescriptionSVG,
        sizeDescriptionSVG,
        selectedDimensions,
    );

    setDescriptionLabels(selectedDimensions);

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
                drawChartDescriptions(
                    colorDescriptionSVG,
                    shapeDescriptionSVG,
                    sizeDescriptionSVG,
                    selectedDimensions,
                );
                setDescriptionLabels(selectedDimensions);
            }),
    );
});

function showDetails(data) {
    data.forEach(
        (value, index) =>
            (document.getElementById(`details-${index}`).innerHTML = value),
    );
}

function setDescriptionLabels(selectedDimensions) {
    const colorDescriptionLabel = document.getElementById(
        'color-description-label',
    );
    const shapeDescriptionLabel = document.getElementById(
        'shape-description-label',
    );
    const sizeDescriptionLabel = document.getElementById(
        'size-description-label',
    );

    switch (selectedDimensions.color) {
        case 3:
            colorDescriptionLabel.innerHTML = 'Zylinder';
            break;
        case 8:
            colorDescriptionLabel.innerHTML = 'Jahr';
            break;
        case 9:
            colorDescriptionLabel.innerHTML = 'Herkunft';
            break;
        default:
            colorDescriptionLabel.innerHTML = '';
    }

    switch (selectedDimensions.shape) {
        case 3:
            shapeDescriptionLabel.innerHTML = 'Zylinder';
            break;
        case 9:
            shapeDescriptionLabel.innerHTML = 'Herkunft';
            break;
        default:
            shapeDescriptionLabel.innerHTML = '';
    }

    switch (selectedDimensions.size) {
        case 2:
            sizeDescriptionLabel.innerHTML = 'Verbrauch';
            break;
        case 3:
            sizeDescriptionLabel.innerHTML = 'Zylinder';
            break;
        case 4:
            sizeDescriptionLabel.innerHTML = 'Hubraum';
            break;
        case 5:
            sizeDescriptionLabel.innerHTML = 'PS';
            break;
        case 6:
            sizeDescriptionLabel.innerHTML = 'Gewicht';
            break;
        case 7:
            sizeDescriptionLabel.innerHTML = 'Beschleunigung';
            break;
        case 8:
            sizeDescriptionLabel.innerHTML = 'Jahr';
            break;
        default:
            sizeDescriptionLabel.innerHTML = '';
    }
}

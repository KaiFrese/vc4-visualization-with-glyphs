const NAMESPACE = 'http://www.w3.org/2000/svg';

const SVG_SIZE = 1000;
const CHART_OFFSET = 100;
const STEP_LINE_LENGHT = 15;
const STEP_FONT_SIZE = 17;
const STEP_TEXT_GAP = 3;

const AXIS_BORDERS = [
    { min: 0, max: 20, step: 5, stepCount: 4 }, // consumption
    { min: 0, max: 8, step: 1, stepCount: 8 }, // cylinders
    { min: 0, max: 8000, step: 1000, stepCount: 8 }, // displacement
    { min: 0, max: 250, step: 50, stepCount: 5 }, // horsepower
    { min: 0, max: 2500, step: 500, stepCount: 5 }, // weight
    { min: 0, max: 25, step: 5, stepCount: 5 }, // acceleration
    { min: 1970, max: 1982, step: 2, stepCount: 6 }, // year
];

const SIZE_BORDERS = [
    { min: 10, max: 30 }, // consumption
    { min: 10, max: 20 }, // cylinders
    { min: 10, max: 28 }, // displacement
    { min: 10, max: 24 }, // horsepower
    { min: 10, max: 22 }, // weight
    { min: 10, max: 22 }, // acceleration
    { min: 10, max: 34 }, // year
];

function drawChart(svg, data, selectedDimensions) {
    svg.innerHTML = '';
    drawXAxis(svg, selectedDimensions.xAxis - 2);
    drawYAxis(svg, selectedDimensions.yAxis - 2);
    // drawDatapoints(chartSVG, data, selectedDimensions, {
    //     xMin: 0, //Todo
    //     xMax: 0, //Todo
    //     yMin: 0, //Todo
    //     yMax: 0, //Todo
    //     xStep: 0, //Todo
    //     yStep: 0, //Todo
    // });
}

function drawXAxis(svg, dimension) {
    if (dimension >= 0) {
        const axis = document.createElementNS(NAMESPACE, 'line');
        axis.setAttribute('x1', `${CHART_OFFSET - STEP_LINE_LENGHT}`);
        axis.setAttribute(
            'x2',
            `${SVG_SIZE - CHART_OFFSET + STEP_LINE_LENGHT * 2}`,
        );
        axis.setAttribute('y1', `${SVG_SIZE - CHART_OFFSET}`);
        axis.setAttribute('y2', `${SVG_SIZE - CHART_OFFSET}`);
        axis.setAttribute('stroke', '#000000');
        svg.appendChild(axis);

        drawText(
            svg,
            {
                x: CHART_OFFSET,
                y: SVG_SIZE - CHART_OFFSET + STEP_LINE_LENGHT + STEP_TEXT_GAP,
            },
            STEP_FONT_SIZE,
            { horizontal: 'center', vertical: 'top' },
            `${AXIS_BORDERS[dimension].min}`,
        );

        const stepWidth =
            (SVG_SIZE - 2 * CHART_OFFSET) / AXIS_BORDERS[dimension].stepCount;

        for (let i = 0; i < AXIS_BORDERS[dimension].stepCount; i++) {
            const xPosition = CHART_OFFSET + stepWidth * (i + 1);
            const axis = document.createElementNS(NAMESPACE, 'line');
            axis.setAttribute('x1', `${xPosition}`);
            axis.setAttribute('x2', `${xPosition}`);
            axis.setAttribute('y1', `${SVG_SIZE - CHART_OFFSET}`);
            axis.setAttribute(
                'y2',
                `${SVG_SIZE - CHART_OFFSET + STEP_LINE_LENGHT}`,
            );
            axis.setAttribute('stroke', '#000000');
            svg.appendChild(axis);

            drawText(
                svg,
                {
                    x: xPosition,
                    y:
                        SVG_SIZE -
                        CHART_OFFSET +
                        STEP_LINE_LENGHT +
                        STEP_TEXT_GAP,
                },
                STEP_FONT_SIZE,
                { horizontal: 'center', vertical: 'top' },
                `${AXIS_BORDERS[dimension].min + AXIS_BORDERS[dimension].step * (i + 1)}`,
            );
        }
    }
}

function drawYAxis(svg, dimension) {
    if (dimension >= 0) {
        const axis = document.createElementNS(NAMESPACE, 'line');
        axis.setAttribute('x1', `${CHART_OFFSET}`);
        axis.setAttribute('x2', `${CHART_OFFSET}`);
        axis.setAttribute('y1', `${CHART_OFFSET - STEP_LINE_LENGHT * 2}`);
        axis.setAttribute(
            'y2',
            `${SVG_SIZE - CHART_OFFSET + STEP_LINE_LENGHT}`,
        );
        axis.setAttribute('stroke', '#000000');
        svg.appendChild(axis);

        drawText(
            svg,
            {
                x: CHART_OFFSET - STEP_LINE_LENGHT - STEP_TEXT_GAP,
                y: SVG_SIZE - CHART_OFFSET,
            },
            STEP_FONT_SIZE,
            { horizontal: 'right', vertical: 'middle' },
            `${AXIS_BORDERS[dimension].min}`,
        );

        const stepWidth =
            (SVG_SIZE - 2 * CHART_OFFSET) / AXIS_BORDERS[dimension].stepCount;

        for (let i = 0; i < AXIS_BORDERS[dimension].stepCount; i++) {
            const yPosition = SVG_SIZE - CHART_OFFSET - stepWidth * (i + 1);
            const axis = document.createElementNS(NAMESPACE, 'line');
            axis.setAttribute('x1', `${CHART_OFFSET - STEP_LINE_LENGHT}`);
            axis.setAttribute('x2', `${CHART_OFFSET}`);
            axis.setAttribute('y1', `${yPosition}`);
            axis.setAttribute('y2', `${yPosition}`);
            axis.setAttribute('stroke', '#000000');
            svg.appendChild(axis);

            drawText(
                svg,
                {
                    x: CHART_OFFSET - STEP_LINE_LENGHT - STEP_TEXT_GAP,
                    y: yPosition,
                },
                STEP_FONT_SIZE,
                { horizontal: 'right', vertical: 'middle' },
                `${AXIS_BORDERS[dimension].min + AXIS_BORDERS[dimension].step * (i + 1)}`,
            );
        }
    }
}

function drawDatapoints(chartSVG, data, selectedDimensions, axisDimensions) {
    data.forEach((element) => {
        const xValue = element[selectedDimensions.xAxis];
        const yValue = element[selectedDimensions.yAxis];
        const sizeValue = element[selectedDimensions.size];

        const position = 0; //Todo
        let color = '#ffffff';
        let size = 5; //Todo

        switch (selectedDimensions.color) {
            case 3:
                switch (element[3]) {
                    case 3:
                        color = '#f2f0f7';
                        break;
                    case 4:
                        color = '#dadaeb';
                        break;
                    case 5:
                        color = '#bcbddc';
                        break;
                    case 6:
                        color = '#9e9ac8';
                        break;
                    case 8:
                        color = '#54278f';
                        break;
                }
                break;
            case 8:
                switch (element[8]) {
                    case 70:
                        color = '#fcfbfd';
                        break;
                    case 71:
                        color = '#ede4f5';
                        break;
                    case 72:
                        color = '#d6c3e8';
                        break;
                    case 73:
                        color = '#c0a7d8';
                        break;
                    case 74:
                        color = '#a887c8';
                        break;
                    case 75:
                        color = '#8e6ab2';
                        break;
                    case 76:
                        color = '#7d56a3';
                        break;
                    case 77:
                        color = '#6c4394';
                        break;
                    case 78:
                        color = '#5c3484';
                        break;
                    case 79:
                        color = '#47216e';
                        break;
                    case 80:
                        color = '#2b084d';
                        break;
                    case 81:
                        color = '#1a0331';
                        break;
                    case 82:
                        color = '#000000';
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'american':
                        color = '#66c2a5';
                        break;
                    case 'european':
                        color = '#fc8d62';
                        break;
                    case 'japanese':
                        color = '#8da0cb';
                        break;
                }
                break;
        }

        switch (selectedDimensions.shape) {
            case -1:
                drawCircle(position, color, size, chartSVG, element);
                break;
            case 3:
                switch (element[3]) {
                    case 3:
                        drawRect(position, color, size, chartSVG, element);
                        break;
                    case 4:
                        drawCircle(position, color, size, chartSVG, element);
                        break;
                    case 5:
                        drawTriangle(position, color, size, chartSVG, element);
                        break;
                    case 6:
                        drawDiamond(position, color, size, chartSVG, element);
                        break;
                    case 8:
                        drawCross(position, color, size, chartSVG, element);
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'american':
                        drawRect(position, color, size, chartSVG, element);
                        break;
                    case 'european':
                        drawTriangle(position, color, size, chartSVG, element);
                        break;
                    case 'japanese':
                        drawCircle(position, color, size, chartSVG, element);
                        break;
                }
                break;
        }
    });
}

function drawCircle(position, color, size, svg, elementData) {
    const circle = document.createElementNS(NAMESPACE, 'circle');
    circle.setAttribute('cx', `${position.x}`);
    circle.setAttribute('cy', `${position.y}`);
    circle.setAttribute('r', size);
    circle.setAttribute('fill', color);

    //Todo: add border

    circle.addEventListener('click', () => showDetails(elementData));
    circle.addEventListener('mouseover', () =>
        drawText(position, elementData[0]),
    );

    svg.appendChild(circle);

    return circle;
}

function drawRect(position, color, size, svg, elementData) {
    const rect = document.createElementNS(NAMESPACE, 'rect');
    rect.setAttribute('x', `${position.x - size / 2}`);
    rect.setAttribute('y', `${position.y - size / 2}`);
    rect.setAttribute('width', size);
    rect.setAttribute('height', size);
    rect.setAttribute('fill', color);

    //Todo: add border

    rect.addEventListener('click', () => showDetails(elementData));
    rect.addEventListener('mouseover', () =>
        drawText(position, elementData[0]),
    );

    svg.appendChild(rect);

    return rect;
}

function drawTriangle(position, color, size, svg, elementData) {
    const triangle = document.createElementNS(NAMESPACE, 'polygon');
    triangle.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    triangle.setAttribute('fill', color);

    //Todo: add border
    //Todo: add size

    triangle.addEventListener('click', () => showDetails(elementData));
    triangle.addEventListener('mouseover', () =>
        drawText(position, elementData[0]),
    );

    svg.appendChild(triangle);

    return triangle;
}

function drawDiamond(position, color, size, svg, elementData) {
    const diamond = document.createElementNS(NAMESPACE, 'polygon');
    diamond.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    diamond.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

    diamond.addEventListener('click', () => showDetails(elementData));
    diamond.addEventListener('mouseover', () =>
        drawText(position, elementData[0]),
    );

    svg.appendChild(diamond);

    return diamond;
}

function drawCross(position, color, size, svg, elementData) {
    const cross = document.createElementNS(NAMESPACE, 'polygon');
    cross.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    cross.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

    cross.addEventListener('click', () => showDetails(elementData));
    cross.addEventListener('mouseover', () =>
        drawText(position, elementData[0]),
    );

    svg.appendChild(cross);

    return cross;
}

function drawText(svg, position, fontSize, textAlignment, text) {
    const textElement = document.createElementNS(NAMESPACE, 'text');

    switch (textAlignment.vertical) {
        case 'middle':
            textElement.setAttribute(
                'y',
                `${position.y + (fontSize - fontSize / 3) / 2}`,
            );
            break;
        case 'top':
            textElement.setAttribute(
                'y',
                `${position.y + fontSize - fontSize / 3}`,
            );
            break;
        default:
            textElement.setAttribute('y', `${position.y + fontSize}`);
            break;
    }

    textElement.setAttribute('font-size', `${fontSize}`);
    textElement.setAttribute('fill', '#000000');
    textElement.innerHTML = text;

    svg.appendChild(textElement);

    switch (textAlignment.horizontal) {
        case 'center':
            textElement.setAttribute(
                'x',
                `${position.x - textElement.getBBox().width / 2}`,
            );
            break;
        case 'right':
            textElement.setAttribute(
                'x',
                `${position.x - textElement.getBBox().width}`,
            );
            break;
        default:
            textElement.setAttribute('x', `${position.x}`);
            break;
    }
}

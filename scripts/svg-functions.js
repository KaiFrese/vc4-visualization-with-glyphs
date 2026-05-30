const NAMESPACE = 'http://www.w3.org/2000/svg';

const SVG_SIZE = 1000;
const CHART_OFFSET = 100;
const STEP_LINE_LENGHT = 15;
const STEP_FONT_SIZE = 17;
const STEP_TEXT_GAP = 3;

const BACKGROUND_COLOR = '#cccccc';
const AXIS_COLOR = '#000000';
const TEXT_COLOR = '#000000';

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
    drawRect(
        { x: SVG_SIZE / 2, y: SVG_SIZE / 2 },
        BACKGROUND_COLOR,
        SVG_SIZE,
        svg,
    );
    drawXAxis(svg, selectedDimensions.xAxis - 2);
    drawYAxis(svg, selectedDimensions.yAxis - 2);
    drawDatapoints(svg, data, selectedDimensions);
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
        axis.setAttribute('stroke', AXIS_COLOR);
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
            axis.setAttribute('stroke', AXIS_COLOR);
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
        axis.setAttribute('stroke', AXIS_COLOR);
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
            axis.setAttribute('stroke', AXIS_COLOR);
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

function drawDatapoints(svg, data, selectedDimensions) {
    const xMin = AXIS_BORDERS[selectedDimensions.xAxis - 2].min;
    const xMax = AXIS_BORDERS[selectedDimensions.xAxis - 2].max;
    const yMin = AXIS_BORDERS[selectedDimensions.yAxis - 2].min;
    const yMax = AXIS_BORDERS[selectedDimensions.yAxis - 2].max;

    data.forEach((element) => {
        const xValue = element[selectedDimensions.xAxis]
            ? element[selectedDimensions.xAxis]
            : xMin;
        const yValue = element[selectedDimensions.yAxis]
            ? element[selectedDimensions.yAxis]
            : yMin;
        const sizeValue = element[selectedDimensions.size]
            ? element[selectedDimensions.size]
            : 10;

        const position = {
            x:
                CHART_OFFSET +
                ((SVG_SIZE - CHART_OFFSET * 2) / 100) *
                    (((xMax - xValue) * 100) / (xMax - xMin)),
            y:
                SVG_SIZE -
                CHART_OFFSET -
                ((SVG_SIZE - CHART_OFFSET * 2) / 100) *
                    (((yMax - yValue) * 100) / (yMax - yMin)),
        };
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
                    case 1970:
                        color = '#fcfbfd';
                        break;
                    case 1971:
                        color = '#ede4f5';
                        break;
                    case 1972:
                        color = '#d6c3e8';
                        break;
                    case 1973:
                        color = '#c0a7d8';
                        break;
                    case 1974:
                        color = '#a887c8';
                        break;
                    case 1975:
                        color = '#8e6ab2';
                        break;
                    case 1976:
                        color = '#7d56a3';
                        break;
                    case 1977:
                        color = '#6c4394';
                        break;
                    case 1978:
                        color = '#5c3484';
                        break;
                    case 1979:
                        color = '#47216e';
                        break;
                    case 1980:
                        color = '#2b084d';
                        break;
                    case 1981:
                        color = '#1a0331';
                        break;
                    case 1982:
                        color = '#000000';
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'American':
                        color = '#66c2a5';
                        break;
                    case 'European':
                        color = '#fc8d62';
                        break;
                    case 'Japanese':
                        color = '#8da0cb';
                        break;
                }
                break;
        }

        let dataElement = drawCircle(position, color, size, svg);

        switch (selectedDimensions.shape) {
            case 3:
                switch (element[3]) {
                    case 3:
                        dataElement = drawRect(position, color, size, svg);
                        break;
                    case 4:
                        dataElement = drawCircle(position, color, size, svg);
                        break;
                    case 5:
                        dataElement = drawTriangle(position, color, size, svg);
                        break;
                    case 6:
                        dataElement = drawDiamond(position, color, size, svg);
                        break;
                    case 8:
                        dataElement = drawCross(position, color, size, svg);
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'american':
                        dataElement = drawRect(position, color, size, svg);
                        break;
                    case 'european':
                        dataElement = drawTriangle(position, color, size, svg);
                        break;
                    case 'japanese':
                        dataElement = drawCircle(position, color, size, svg);
                        break;
                }
                break;
        }

        addClickEventHandler(dataElement, element);
        addHoverEventHandler(svg, dataElement, position, element);
    });
}

function drawCircle(position, color, size, svg) {
    const circle = document.createElementNS(NAMESPACE, 'circle');
    circle.setAttribute('cx', `${position.x}`);
    circle.setAttribute('cy', `${position.y}`);
    circle.setAttribute('r', size);
    circle.setAttribute('fill', color);

    //Todo: add border

    svg.appendChild(circle);

    return circle;
}

function drawRect(position, color, size, svg) {
    const rect = document.createElementNS(NAMESPACE, 'rect');
    rect.setAttribute('x', `${position.x - size / 2}`);
    rect.setAttribute('y', `${position.y - size / 2}`);
    rect.setAttribute('width', size);
    rect.setAttribute('height', size);
    rect.setAttribute('fill', color);

    //Todo: add border

    svg.appendChild(rect);

    return rect;
}

function drawTriangle(position, color, size, svg) {
    const triangle = document.createElementNS(NAMESPACE, 'polygon');
    triangle.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    triangle.setAttribute('fill', color);

    //Todo: add border
    //Todo: add size

    svg.appendChild(triangle);

    return triangle;
}

function drawDiamond(position, color, size, svg) {
    const diamond = document.createElementNS(NAMESPACE, 'polygon');
    diamond.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    diamond.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

    svg.appendChild(diamond);

    return diamond;
}

function drawCross(position, color, size, svg) {
    const cross = document.createElementNS(NAMESPACE, 'polygon');
    cross.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    cross.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

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
            textElement.setAttribute('y', `${position.y}`);
            break;
    }

    textElement.setAttribute('font-size', `${fontSize}`);
    textElement.setAttribute('fill', TEXT_COLOR);
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

    return textElement;
}

function addClickEventHandler(element, data) {
    element.addEventListener('click', () => showDetails(data));
}

function addHoverEventHandler(svg, element, position, data) {
    const textElement = drawText(
        svg,
        position,
        17,
        { horizontal: 'left', vertical: 'bottom' },
        data[0],
    );

    textElement.remove();

    element.addEventListener('mouseenter', () => svg.appendChild(textElement));
    element.addEventListener('mouseleave', () => textElement.remove());
}

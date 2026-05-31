const NAMESPACE = 'http://www.w3.org/2000/svg';

const SVG_SIZE = 1000;
const CHART_OFFSET = 100;
const STEP_LINE_LENGHT = 15;
const STEP_FONT_SIZE = 17;
const STEP_TEXT_GAP = 3;
const MIN_SIZE = 15;

const BACKGROUND_COLOR = '#cccccc';
const AXIS_COLOR = '#000000';
const TEXT_COLOR = '#000000';
const BORDER_COLOR = '#000000';

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
    { min: 2, max: 20 }, // consumption
    { min: 2, max: 8 }, // cylinders
    { min: 1000, max: 8000 }, // displacement
    { min: 40, max: 250 }, // horsepower
    { min: 500, max: 2500 }, // weight
    { min: 5, max: 25 }, // acceleration
    { min: 1970, max: 1982 }, // year
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

function drawChartDescriptions(
    colorDescriptionSVG,
    shapeDescriptionSVG,
    sizeDescriptionSVG,
    selectedDimensions,
) {
    colorDescriptionSVG.style.display = 'none';
    shapeDescriptionSVG.style.display = 'none';
    sizeDescriptionSVG.style.display = 'none';
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
            : (MIN_SIZE / 3) * 2;

        const position = {
            x:
                CHART_OFFSET +
                ((SVG_SIZE - CHART_OFFSET * 2) / 100) *
                    ((xValue * 100) / (xMax - xMin)),
            y:
                SVG_SIZE -
                CHART_OFFSET -
                ((SVG_SIZE - CHART_OFFSET * 2) / 100) *
                    ((yValue * 100) / (yMax - yMin)),
        };
        let color = '#ffffff';
        let size =
            selectedDimensions.size - 2 >= 0
                ? MIN_SIZE *
                  Math.sqrt(
                      sizeValue / SIZE_BORDERS[selectedDimensions.size - 2].min,
                  )
                : MIN_SIZE;

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

        let dataElement;

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
                    default:
                        dataElement = drawCircle(position, color, size, svg);
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'American':
                        dataElement = drawRect(position, color, size, svg);
                        break;
                    case 'European':
                        dataElement = drawTriangle(position, color, size, svg);
                        break;
                    case 'Japanese':
                        dataElement = drawCircle(position, color, size, svg);
                        break;
                    default:
                        dataElement = drawCircle(position, color, size, svg);
                        break;
                }
                break;
            default:
                dataElement = drawCircle(position, color, size, svg);
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
    circle.setAttribute('r', size / 2);
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', BORDER_COLOR);

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
    rect.setAttribute('stroke', BORDER_COLOR);

    svg.appendChild(rect);

    return rect;
}

function drawTriangle(position, color, size, svg) {
    const triangle = document.createElementNS(NAMESPACE, 'polygon');

    const topPoint = { x: position.x, y: position.y - size / 2 };
    const leftPoint = { x: position.x - size / 2, y: position.y + size / 2 };
    const rightPoint = { x: position.x + size / 2, y: position.y + size / 2 };

    triangle.setAttribute(
        'points',
        `${topPoint.x},${topPoint.y} 
        ${leftPoint.x},${leftPoint.y} 
        ${rightPoint.x},${rightPoint.y}`,
    );
    triangle.setAttribute('fill', color);
    triangle.setAttribute('stroke', BORDER_COLOR);

    svg.appendChild(triangle);

    return triangle;
}

function drawDiamond(position, color, size, svg) {
    const diamond = document.createElementNS(NAMESPACE, 'polygon');

    const topPoint = { x: position.x, y: position.y - (size / 3) * 2 };
    const leftPoint = { x: position.x - size / 2, y: position.y };
    const rightPoint = { x: position.x + size / 2, y: position.y };
    const bottomPoint = { x: position.x, y: position.y + (size / 3) * 2 };

    diamond.setAttribute(
        'points',
        `${topPoint.x},${topPoint.y} 
        ${leftPoint.x},${leftPoint.y} 
        ${bottomPoint.x},${bottomPoint.y} 
        ${rightPoint.x},${rightPoint.y}`,
    );
    diamond.setAttribute('fill', color);
    diamond.setAttribute('stroke', BORDER_COLOR);

    svg.appendChild(diamond);

    return diamond;
}

function drawCross(position, color, size, svg) {
    const cross = document.createElementNS(NAMESPACE, 'polygon');

    const sizeAdjust = (size / 5) * 3;
    const sizeAdjustHalf = sizeAdjust / 2;

    const topLeftPoint = {
        x: position.x - sizeAdjustHalf,
        y: position.y - sizeAdjust,
    };
    const topRightPoint = {
        x: position.x + sizeAdjustHalf,
        y: position.y - sizeAdjust,
    };
    const leftTopPoint = {
        x: position.x - sizeAdjust,
        y: position.y - sizeAdjustHalf,
    };
    const leftBottomPoint = {
        x: position.x - sizeAdjust,
        y: position.y + sizeAdjustHalf,
    };
    const rightTopPoint = {
        x: position.x + sizeAdjust,
        y: position.y - sizeAdjustHalf,
    };
    const rightBottomPoint = {
        x: position.x + sizeAdjust,
        y: position.y + sizeAdjustHalf,
    };
    const bottomLeftPoint = {
        x: position.x - sizeAdjustHalf,
        y: position.y + sizeAdjust,
    };
    const bottomRightPoint = {
        x: position.x + sizeAdjustHalf,
        y: position.y + sizeAdjust,
    };
    const topLeftMiddlePoint = {
        x: position.x - sizeAdjustHalf,
        y: position.y - sizeAdjustHalf,
    };
    const topRightMiddlePoint = {
        x: position.x + sizeAdjustHalf,
        y: position.y - sizeAdjustHalf,
    };
    const bottomLeftMiddlePoint = {
        x: position.x - sizeAdjustHalf,
        y: position.y + sizeAdjustHalf,
    };
    const bottomRightMiddlePoint = {
        x: position.x + sizeAdjustHalf,
        y: position.y + sizeAdjustHalf,
    };

    cross.setAttribute(
        'points',
        `${topLeftPoint.x},${topLeftPoint.y} 
        ${topRightPoint.x},${topRightPoint.y} 
        ${topRightMiddlePoint.x},${topRightMiddlePoint.y} 
        ${rightTopPoint.x},${rightTopPoint.y} 
        ${rightBottomPoint.x},${rightBottomPoint.y} 
        ${bottomRightMiddlePoint.x},${bottomRightMiddlePoint.y} 
        ${bottomRightPoint.x},${bottomRightPoint.y} 
        ${bottomLeftPoint.x},${bottomLeftPoint.y} 
        ${bottomLeftMiddlePoint.x},${bottomLeftMiddlePoint.y} 
        ${leftBottomPoint.x},${leftBottomPoint.y} 
        ${leftTopPoint.x},${leftTopPoint.y} 
        ${topLeftMiddlePoint.x},${topLeftMiddlePoint.y}`,
    );
    cross.setAttribute('fill', color);
    cross.setAttribute('stroke', BORDER_COLOR);

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

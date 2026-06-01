const NAMESPACE = 'http://www.w3.org/2000/svg';

const SVG_SIZE = 1050;
const CHART_OFFSET = 125;
const STEP_LINE_LENGHT = 15;
const STEP_FONT_SIZE = 20;
const STEP_TEXT_GAP = 3;
const MIN_SIZE = 15;
const CHART_DESCRIPTION_Y_POSITION = 50;
const CHART_DESCRIPTION_LABEL_Y_POSITION = 10;

const AXIS_COLOR = '#000000';
const TEXT_COLOR = '#000000';
const BORDER_COLOR = '#00000099';
const CYLINDER_COLORS = [
    '#f2f0f799',
    '#dadaeb99',
    '#bcbddc99',
    '#9e9ac899',
    '#756bb199',
    '#54278f99',
];
const YEAR_COLORS = [
    '#fcfbfd99',
    '#ede4f599',
    '#d6c3e899',
    '#c0a7d899',
    '#a887c899',
    '#8e6ab299',
    '#7d56a399',
    '#6c439499',
    '#5c348499',
    '#47216e99',
    '#2b084d99',
    '#1a033199',
    '#00000099',
];
const ORIGIN_COLORS = ['#66c2a599', '#fc8d6299', '#8da0cb99'];

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
    drawXAxis(svg, selectedDimensions.xAxis);
    drawYAxis(svg, selectedDimensions.yAxis);
    drawDatapoints(svg, data, selectedDimensions);
    drawChartDescriptions(svg, selectedDimensions);
}

function drawXAxis(svg, dimension) {
    if (dimension >= 2) {
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
                x: SVG_SIZE / 2,
                y:
                    SVG_SIZE -
                    CHART_OFFSET +
                    STEP_LINE_LENGHT +
                    STEP_TEXT_GAP +
                    50,
            },
            STEP_FONT_SIZE,
            { horizontal: 'center', vertical: 'top' },
            getDimensionLabel('axis', dimension),
        ).setAttribute('font-weight', 'bold');

        drawText(
            svg,
            {
                x: CHART_OFFSET,
                y: SVG_SIZE - CHART_OFFSET + STEP_LINE_LENGHT + STEP_TEXT_GAP,
            },
            STEP_FONT_SIZE,
            { horizontal: 'center', vertical: 'top' },
            `${AXIS_BORDERS[dimension - 2].min}`,
        );

        const stepWidth =
            (SVG_SIZE - 2 * CHART_OFFSET) /
            AXIS_BORDERS[dimension - 2].stepCount;

        for (let i = 0; i < AXIS_BORDERS[dimension - 2].stepCount; i++) {
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
                `${AXIS_BORDERS[dimension - 2].min + AXIS_BORDERS[dimension - 2].step * (i + 1)}`,
            );
        }
    }
}

function drawYAxis(svg, dimension) {
    if (dimension >= 2) {
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

        const textElement = drawText(
            svg,
            {
                x: CHART_OFFSET - STEP_LINE_LENGHT - STEP_TEXT_GAP - 50,
                y: SVG_SIZE / 2,
            },
            STEP_FONT_SIZE,
            { horizontal: 'center', vertical: 'middle' },
            getDimensionLabel('axis', dimension),
        );
        textElement.setAttribute('font-weight', 'bold');
        textElement.setAttribute(
            'transform',
            `rotate(-90, ${CHART_OFFSET - STEP_LINE_LENGHT - STEP_TEXT_GAP - 50}, ${SVG_SIZE / 2})`,
        );

        drawText(
            svg,
            {
                x: CHART_OFFSET - STEP_LINE_LENGHT - STEP_TEXT_GAP,
                y: SVG_SIZE - CHART_OFFSET,
            },
            STEP_FONT_SIZE,
            { horizontal: 'right', vertical: 'middle' },
            `${AXIS_BORDERS[dimension - 2].min}`,
        );

        const stepWidth =
            (SVG_SIZE - 2 * CHART_OFFSET) /
            AXIS_BORDERS[dimension - 2].stepCount;

        for (let i = 0; i < AXIS_BORDERS[dimension - 2].stepCount; i++) {
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
                `${AXIS_BORDERS[dimension - 2].min + AXIS_BORDERS[dimension - 2].step * (i + 1)}`,
            );
        }
    }
}

function drawChartDescriptions(svg, selectedDimensions) {
    drawText(
        svg,
        { x: 2, y: CHART_DESCRIPTION_LABEL_Y_POSITION },
        STEP_FONT_SIZE,
        { horizontal: 'left', vertical: 'middle' },
        getDimensionLabel('color', selectedDimensions.color),
    ).setAttribute('font-weight', 'bold');
    drawText(
        svg,
        { x: 530, y: CHART_DESCRIPTION_LABEL_Y_POSITION },
        STEP_FONT_SIZE,
        { horizontal: 'left', vertical: 'middle' },
        getDimensionLabel('shape', selectedDimensions.shape),
    ).setAttribute('font-weight', 'bold');
    drawText(
        svg,
        { x: 830, y: CHART_DESCRIPTION_LABEL_Y_POSITION },
        STEP_FONT_SIZE,
        { horizontal: 'left', vertical: 'middle' },
        getDimensionLabel('size', selectedDimensions.size),
    ).setAttribute('font-weight', 'bold');

    if (selectedDimensions.size > 1) {
        let maxSize =
            MIN_SIZE *
            Math.sqrt(
                SIZE_BORDERS[selectedDimensions.size - 2].max /
                    SIZE_BORDERS[selectedDimensions.size - 2].min,
            );

        if (selectedDimensions.size === 8) {
            maxSize =
                MIN_SIZE *
                Math.sqrt(
                    SIZE_BORDERS[selectedDimensions.size - 2].max -
                        SIZE_BORDERS[selectedDimensions.size - 2].min,
                );
        }

        drawCircle(
            { x: 840, y: CHART_DESCRIPTION_Y_POSITION },
            '#000000',
            MIN_SIZE,
            svg,
        );
        drawCircle(
            { x: 930, y: CHART_DESCRIPTION_Y_POSITION },
            '#000000',
            maxSize,
            svg,
        );
        drawText(
            svg,
            { x: 855, y: CHART_DESCRIPTION_Y_POSITION },
            STEP_FONT_SIZE,
            { horizontal: 'left', vertical: 'middle' },
            `${SIZE_BORDERS[selectedDimensions.size - 2].min}`,
        );
        drawText(
            svg,
            { x: 960, y: CHART_DESCRIPTION_Y_POSITION },
            STEP_FONT_SIZE,
            { horizontal: 'left', vertical: 'middle' },
            `${SIZE_BORDERS[selectedDimensions.size - 2].max}`,
        );
    }

    switch (selectedDimensions.color) {
        case 3:
            drawText(
                svg,
                { x: 15, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'right', vertical: 'middle' },
                '2',
            );
            drawText(
                svg,
                {
                    x: 45 + 30 * CYLINDER_COLORS.length,
                    y: CHART_DESCRIPTION_Y_POSITION,
                },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '8',
            );

            for (let i = 0; i < CYLINDER_COLORS.length; i++) {
                drawRect(
                    { x: 45 + 30 * i, y: CHART_DESCRIPTION_Y_POSITION },
                    CYLINDER_COLORS[i],
                    30,
                    svg,
                );
            }

            break;
        case 8:
            drawText(
                svg,
                { x: 40, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'right', vertical: 'middle' },
                '1970',
            );
            drawText(
                svg,
                {
                    x: 70 + 30 * YEAR_COLORS.length,
                    y: CHART_DESCRIPTION_Y_POSITION,
                },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '1982',
            );

            for (let i = 0; i < YEAR_COLORS.length; i++) {
                drawRect(
                    { x: 70 + 30 * i, y: CHART_DESCRIPTION_Y_POSITION },
                    YEAR_COLORS[i],
                    30,
                    svg,
                );
            }

            break;
        case 9:
            drawText(
                svg,
                { x: 40, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Amerika',
            );
            drawText(
                svg,
                { x: 160, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Europa',
            );
            drawText(
                svg,
                { x: 280, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Japan',
            );

            for (let i = 0; i < ORIGIN_COLORS.length; i++) {
                drawRect(
                    { x: 20 + 120 * i, y: CHART_DESCRIPTION_Y_POSITION },
                    ORIGIN_COLORS[i],
                    30,
                    svg,
                );
            }

            break;
    }

    switch (selectedDimensions.shape) {
        case 3:
            drawRect(
                { x: 540, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawCircle(
                { x: 590, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawTriangle(
                { x: 640, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawDiamond(
                { x: 690, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawCross(
                { x: 740, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );

            drawText(
                svg,
                { x: 555, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '3',
            );
            drawText(
                svg,
                { x: 605, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '4',
            );
            drawText(
                svg,
                { x: 655, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '5',
            );
            drawText(
                svg,
                { x: 705, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '6',
            );
            drawText(
                svg,
                { x: 755, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                '8',
            );

            break;
        case 9:
            drawRect(
                { x: 540, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawTriangle(
                { x: 640, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );
            drawCircle(
                { x: 740, y: CHART_DESCRIPTION_Y_POSITION },
                '#000000',
                MIN_SIZE,
                svg,
            );

            drawText(
                svg,
                { x: 555, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Amerika',
            );
            drawText(
                svg,
                { x: 655, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Europa',
            );
            drawText(
                svg,
                { x: 755, y: CHART_DESCRIPTION_Y_POSITION },
                STEP_FONT_SIZE,
                { horizontal: 'left', vertical: 'middle' },
                'Japan',
            );

            break;
    }
}

function drawDatapoints(svg, data, selectedDimensions) {
    const xMin = AXIS_BORDERS[selectedDimensions.xAxis - 2].min;
    const xMax = AXIS_BORDERS[selectedDimensions.xAxis - 2].max;
    const yMin = AXIS_BORDERS[selectedDimensions.yAxis - 2].min;
    const yMax = AXIS_BORDERS[selectedDimensions.yAxis - 2].max;

    data.forEach((element) => {
        let xValue = element[selectedDimensions.xAxis]
            ? element[selectedDimensions.xAxis]
            : xMin;
        let yValue = element[selectedDimensions.yAxis]
            ? element[selectedDimensions.yAxis]
            : yMin;
        const sizeValue = element[selectedDimensions.size]
            ? element[selectedDimensions.size]
            : (MIN_SIZE / 3) * 2;

        if (selectedDimensions.xAxis === 8) {
            xValue = xValue - xMin;
        }

        if (selectedDimensions.yAxis === 8) {
            yValue = yValue - yMin;
        }

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
        let color = '#ffffff99';
        let size =
            selectedDimensions.size - 2 >= 0
                ? MIN_SIZE *
                  Math.sqrt(
                      sizeValue / SIZE_BORDERS[selectedDimensions.size - 2].min,
                  )
                : MIN_SIZE;

        if (selectedDimensions.size === 8) {
            size =
                MIN_SIZE *
                Math.sqrt(
                    sizeValue - SIZE_BORDERS[selectedDimensions.size - 2].min,
                );
        }

        switch (selectedDimensions.color) {
            case 3:
                switch (element[3]) {
                    case 3:
                        color = CYLINDER_COLORS[0];
                        break;
                    case 4:
                        color = CYLINDER_COLORS[1];
                        break;
                    case 5:
                        color = CYLINDER_COLORS[2];
                        break;
                    case 6:
                        color = CYLINDER_COLORS[3];
                        break;
                    case 7:
                        color = CYLINDER_COLORS[4];
                        break;
                    case 8:
                        color = CYLINDER_COLORS[5];
                        break;
                }
                break;
            case 8:
                switch (element[8]) {
                    case 1970:
                        color = YEAR_COLORS[0];
                        break;
                    case 1971:
                        color = YEAR_COLORS[1];
                        break;
                    case 1972:
                        color = YEAR_COLORS[2];
                        break;
                    case 1973:
                        color = YEAR_COLORS[3];
                        break;
                    case 1974:
                        color = YEAR_COLORS[4];
                        break;
                    case 1975:
                        color = YEAR_COLORS[5];
                        break;
                    case 1976:
                        color = YEAR_COLORS[6];
                        break;
                    case 1977:
                        color = YEAR_COLORS[7];
                        break;
                    case 1978:
                        color = YEAR_COLORS[8];
                        break;
                    case 1979:
                        color = YEAR_COLORS[9];
                        break;
                    case 1980:
                        color = YEAR_COLORS[10];
                        break;
                    case 1981:
                        color = YEAR_COLORS[11];
                        break;
                    case 1982:
                        color = YEAR_COLORS[12];
                        break;
                }
                break;
            case 9:
                switch (element[9]) {
                    case 'American':
                        color = ORIGIN_COLORS[0];
                        break;
                    case 'European':
                        color = ORIGIN_COLORS[1];
                        break;
                    case 'Japanese':
                        color = ORIGIN_COLORS[2];
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
        addHoverEventHandler(
            svg,
            dataElement,
            { x: position.x + 10, y: position.y - 10 },
            element,
        );
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

const NAMESPACE = 'http://www.w3.org/2000/svg';

function drawChart(chartSVG, data, selectedDimensions) {
    drawXAxis(chartSVG);
    drawYAxis(chartSVG);
    drawDatapoints(chartSVG, data);
}

function drawXAxis(chartSVG) {
    //Todo: implement
}

function drawYAxis(chartSVG) {
    //Todo: implement
}

function drawDatapoints(chartSVG, data) {
    //Todo: implement
}

function drawCircle(position, color, size, svg, data) {
    const circle = document.createElementNS(NAMESPACE, 'circle');
    circle.setAttribute('cx', `${position.x}`);
    circle.setAttribute('cy', `${position.y}`);
    circle.setAttribute('r', size);
    circle.setAttribute('fill', color);

    //Todo: add border

    circle.addEventListener('click', () => showDetails(data));
    circle.addEventListener('mouseover', () => drawText(position, data[0]));

    svg.appendChild(circle);

    return circle;
}

function drawRect(position, color, size, svg, data) {
    const rect = document.createElementNS(NAMESPACE, 'rect');
    rect.setAttribute('x', `${position.x - size / 2}`);
    rect.setAttribute('y', `${position.y - size / 2}`);
    rect.setAttribute('width', size);
    rect.setAttribute('height', size);
    rect.setAttribute('fill', color);

    //Todo: add border

    rect.addEventListener('click', () => showDetails(data));
    rect.addEventListener('mouseover', () => drawText(position, data[0]));

    svg.appendChild(rect);

    return rect;
}

function drawTriangle(position, color, size, svg, data) {
    const triangle = document.createElementNS(NAMESPACE, 'polygon');
    triangle.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    triangle.setAttribute('fill', color);

    //Todo: add border
    //Todo: add size

    triangle.addEventListener('click', () => showDetails(data));
    triangle.addEventListener('mouseover', () => drawText(position, data[0]));

    svg.appendChild(triangle);

    return triangle;
}

function drawDiamond(position, color, size, svg, data) {
    const diamond = document.createElementNS(NAMESPACE, 'polygon');
    diamond.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    diamond.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

    diamond.addEventListener('click', () => showDetails(data));
    diamond.addEventListener('mouseover', () => drawText(position, data[0]));

    svg.appendChild(diamond);

    return diamond;
}

function drawCross(position, color, size, svg, data) {
    const cross = document.createElementNS(NAMESPACE, 'polygon');
    cross.setAttribute(
        'points',
        `${position.x},${position.y - 10} ${position.x - 12},${position.y + 10} ${position.x + 12},${position.y + 10}`,
    );
    cross.setAttribute('fill', color);

    //Todo: add border
    //Todo: adjust polygon
    //Todo: add size

    cross.addEventListener('click', () => showDetails(data));
    cross.addEventListener('mouseover', () => drawText(position, data[0]));

    svg.appendChild(cross);

    return cross;
}

function drawText(position, text) {
    //Todo: implement
}

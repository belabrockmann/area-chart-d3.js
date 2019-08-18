document.addEventListener("DOMContentLoaded", () => {
    const render = dataset => {
        let parsedDataset = [];
        Object.keys(dataset.data).forEach(item => {
            parsedDataset.push([+item.slice(0, 4), +dataset.data[item].value]);
        });
        const height = window.innerHeight - 50;
        const width = window.innerWidth - 50;
        const margin = {
            top: 70,
            right: 20,
            bottom: 45,
            left: 65
        };
        const innerHeight = height - margin.top - margin.bottom;
        const innerWidth = width - margin.right - margin.left;

        const xScale = d3.scaleLinear()
            .domain(d3.extent(parsedDataset, d => d[0]))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(parsedDataset, d => d[1]))
            .range([innerHeight, 0])
            .nice();

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(""));
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "gradient")
            .attr("x0", "0%")
            .attr("y0", "0%")
            .attr("x1", "100%")
            .attr("y1", "100%");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("id", "gradient-start");

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("id", "gradient-end");

        const g = svg.append("g")
            .attr("height", innerHeight)
            .attr("width", innerWidth)
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const areaGenerator = d3.area()
            .x(d => xScale(d[0]))
            .y0(innerHeight)
            .y1(d => yScale(d[1]))
            .curve(d3.curveBasis);

        g.append("path")
            .attr("id", "path")
            .attr("d", areaGenerator(parsedDataset));

        g.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${innerHeight})`);

        g.append("g")
            .call(yAxis);

        g.append("text")
            .attr("id", "title")
            .text(dataset.description.title)
            .attr("y", -10);
        g.append("text")
            .attr("class", "label")
            .text("Years")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 40);
        g.append("text")
            .attr("class", "label")
            .text("Precipitation in inches")
            .attr("x", -innerHeight / 2)
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
    }
    fetch("https://www.ncdc.noaa.gov/cag/national/time-series/110-pcp-ytd-12-1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000")
        .then(response => response.json())
        .then(response => render(response));
});
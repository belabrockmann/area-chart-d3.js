document.addEventListener("DOMContentLoaded", () => {
    const render = dataset => {
        let parsedDataset = []
        Object.keys(dataset.data).forEach(item => {
            // parsedDataset.push([item.value, item.anomaly]);
            parsedDataset.push([+dataset.data[item].value, +dataset.data[item].anomaly])
        });
        const height = window.innerHeight - 50;
        const width = window.innerWidth - 50;
        const margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
        const innerHeight = height - margin.top - margin.bottom;
        const innerWidth = width - margin.right - margin.left;

        const xScale = d3.scaleLinear()
            .domain(d3.extent(parsedDataset, d => d[0]))
            .range([0, innerWidth])
            .nice();

        const yScale = d3.scaleLinear()
            .domain(d3.extent(parsedDataset, d => d[1]))
            .range([innerHeight, 0])
            .nice();

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        const g = svg.append("g")
            .attr("height", innerHeight)
            .attr("width", innerWidth)
            .attr("transform", `translate(${margin.left}, ${margin.right})`);

        g.append("g").call(xAxis).attr("transform", `translate(0, ${innerHeight})`)
        g.append("g").call(yAxis)

    }
    fetch("https://www.ncdc.noaa.gov/cag/national/time-series/110-pcp-ytd-12-1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000")
        .then(response => response.json())
        .then(response => render(response))
})
const express = require("express") //creating database with express
const fs = require("fs") // require the file module
const {
    parse
} = require("csv-parse"); // helps to read the csv or converts them to json
const app = express();
const port = 3000;
const dataResults = []; //Arrays of planets data
function habitablePlanet(planet) {
    return planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_prad"] < 1.6 && planet["koi_insol"] < 1.11 &&
        planet["koi_insol"] > 0.36
}
fs.createReadStream("kepler_data.csv") //This function call the on events
    .pipe(parse({ //piping the fs.createReadStream to parse(), this converts bytes to readable json
        comment: "#",
        columns: true
    }))
    .on("data", function (data) {
        if (habitablePlanet(data)) {
            dataResults.push(data);
        }

    })
    .on("error", (err) => {
        console.log(err)
    })
    .on("end", function () {
        console.log(dataResults.map(function (planet) { // mapping out the arrays to get the planets name
            return planet["kepler_name"]
        }))
        console.log(dataResults.length + " is the number of planets found")
    })
app.listen(port, () => {
    console.log(`server is listening to port ${port}`)
})
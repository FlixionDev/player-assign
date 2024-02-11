const express = require("express");
const playerRouter = express.Router();
const fs = require('fs');
const csv = require('fast-csv');
function convertArrayToCsv(data, res) {
    console.log(data)
    const ws = fs.createWriteStream('output.csv');

    csv.write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => {
        res.attachment('output.csv');
        res.sendFile('output.csv', { root: '../Backend' });
        console.log('CSV file sent successfully');
      })
      .on('error', error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  }


  function getPointsLast30Days(points) {
    const currentDate = new Date();

    const last30DaysPoints = points.filter(point => {
        const pointDate = new Date(point[0], point[1] - 1, point[2]);
        const timeDiff = currentDate - pointDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff < 30;
    });


    last30DaysPoints.sort((a, b) => {
        const dateA = new Date(a[0], a[1] - 1, a[2]);
        const dateB = new Date(b[0], b[1] - 1, b[2]);
        return dateA - dateB;
    });

    return last30DaysPoints;
}

playerRouter.get("/top-players", async (req, res) => {
    try {
        let data = await fetch(`https://lichess.org/api/player/top/50/classical`);
        let topPlayer = await data.json();
        res.send(topPlayer)
    } catch (err) {
        res.send({ "message": err })
    }
})
playerRouter.get("/player/:username/rating-history", async (req, res) => {
    const { username } = req.params;
    try {
        let data = await fetch(`https://lichess.org/api/user/${username}/rating-history`);
        let ratingHistory = await data.json();
        let newData = ratingHistory.filter((el, ind) => {
            if (el.name == "Classical") {
                return el.points
            }
        })
       
        //  const r = [
        //     [2016, 3, 12, 2028],
        //     [2016, 3, 13, 2038],
        //     [2024, 2, 10, 2038],
        //     [2024, 1, 21, 2038]
        //   ];
        const last30DaysPoints = getPointsLast30Days(newData);
        res.send(last30DaysPoints);
    } catch (err) {
        res.send({ "message": err })
    }
})

playerRouter.get("/players/:username/rating-history-csv",async(req,res)=>{
    const { username } = req.params;
    try {
        let data = await fetch(`https://lichess.org/api/user/${username}/rating-history`);
        let ratingHistory = await data.json();
        let newData = ratingHistory.filter((el, ind) => {
            if (el.name == "Classical") {
                return el.points
            }
        })
        // const r = [
        //     [2016, 3, 12, 2028],
        //     [2016, 3, 13, 2038],
        //     [2024, 2, 10, 2038],
        //     [2024, 1, 21, 2038]
        // ];
        const last30DaysPoints = getPointsLast30Days(newData);
        convertArrayToCsv(last30DaysPoints, res);
    } catch (err) {
        res.send({ "message": err })
    }
      
      
})
module.exports = { playerRouter }
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// 1) MIDDLEWARES
app.use(morgan("dev"))
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    res.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours.json`)
);


// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    console.log(res.requestTime);

    res.status(200).json({
        status : "success",
        result : tours.length,
        data : {
            tours
        }
    })
}

const getATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(200).json({
        status : "success",
        data : {
            tour
        }
    });
}

const postATour =  (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign( {id : newId}, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/data/tours.json`, 
        JSON.stringify(tours), 
        err => {
        res.status(201).json({
             status: "success",
             data : {
                 tour : newTour
             }
        });
    }
    );
}


const editATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(204).json({
        status : "success",
        data : {
            tour : "<updated here>"
        }
    })
}

const deleteATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(204).json({
        status : "success",
        data : {
            tour : null
        }
    })

}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status : "error",
        message : "this route are still under consturction"
    })
}

const getAUser = (req, res) => {
    res.status(500).json({
        status : "error",
        message : "this route are still under consturction"
    })
}

const postAUser = (req, res) => {
    res.status(500).json({
        status : "error",
        message : "this route are still under consturction"
    })
}

const editAUser = (req, res) => {
    res.status(500).json({
        status : "error",
        message : "this route are still under consturction"
    })
}

const deleteAUser = (req, res) => {
    res.status(500).json({
        status : "error",
        message : "this route are still under consturction"
    })
}

// 3) ROUTER

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(postATour);
tourRouter.route("/:id").get(getATour).patch(editATour).delete(deleteATour);

userRouter.route("/").get(getAllUsers).post(postAUser);
userRouter.route("/:id").get(getAUser).patch(editAUser).delete(deleteAUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

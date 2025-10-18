//[SECTION] Activity: Dependencies and Modules
const express = require("express");
const workoutController = require("../controllers/workoutController");

const auth = require("../auth");

const { verify, verifyAdmin } = require("../auth");


const router = express.Router();

router.post("/addWorkout", verify, workoutController.addWorkout); 
router.get("/getMyWorkouts", verify,workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id",verify, workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus);

module.exports = router;
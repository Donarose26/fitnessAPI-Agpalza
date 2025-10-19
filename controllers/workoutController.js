const Workout = require("../models/Workout");
const { errorHandler } = require('../auth');


module.exports.addWorkout = (req, res) => {

    let newWorkout = new Workout({
        userId : req.user.id,
        name : req.body.name,
        type : req.body.type,
        duration : req.body.duration,
        status : req.body.status
    });
    Workout.findOne({ name: req.body.name, userId: req.user.id })

    .then(existingWorkout => {

        if (existingWorkout) {
            return res.status(409).send({ message: 'Workout already exists'})

        } else {   
            newWorkout.save()
  .then(savedWorkout => {
    res.status(201).send(savedWorkout);
  })
        }
    })
    .catch(error => errorHandler(error, req, res))
}; 



module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({ userId: req.user.id })
    .then(result => {
    
        if(result.length > 0){
            return res.status(200).send({workouts: result});
        }
        else{
            return res.status(404).send({ message: 'No workouts found'});
        }
    })
    .catch(error => errorHandler(error, req, res));
};



// Update workout
module.exports.updateWorkout = (req, res) => {
    let updatedWorkout = {
        userId: req.user.id,
        type : req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status
    };

    return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            res.status(200).send({
                message: 'Workout updated successfully',
                updatedWorkout: workout
            });
        } else {
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};




// Delete Workout 
module.exports.deleteWorkout = (req, res) => {
    return Workout.deleteOne({ _id: req.params.id })
    .then(deletedResult => {
        if (deletedResult < 1) {
            return res.status(404).send({ error: 'No Workout deleted' });
        }
        return res.status(200).send({ 
            message: 'Workout deleted successfully'
        });
    })
    .catch(error => errorHandler(error, req, res));   
};

// Complete Workout Status
module.exports.completeWorkoutStatus = (req, res) => {
    let updatedWorkout = {
        userId: req.user.id,    
        status: "Completed" 
    };

    return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            res.status(200).send({
                message: 'Workout status updated as completed',
                updatedWorkout: workout
            });
        } else {
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

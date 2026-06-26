// const { breakdownTask } = require("../services/gemini.service");

// const { calculateRisk } = require("../utils/riskEngine");


// async function breakdownTaskController(req, res) {

//     try {

//         const { task, deadline, freeHoursPerDay } = req.body;

//         // Basic validation
//         if (!task || !deadline) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Task and deadline are required."
//             });
//         }

//         const aiResponse = await breakdownTask(task, deadline);

//         res.json({
//             success: true,
//             data: aiResponse
//         });

//     } catch(error){

//     console.error(error);

//     res.status(500).json({

//         success:false,

//         message:error.message

//     });

// }

// }

// module.exports = {
//     breakdownTaskController
// };




















/*************************************************/
const { breakdownTask } = require("../services/gemini.service");

const { calculateRisk } = require("../utils/riskEngine");

const { saveTask , getAllTasks } = require("../services/task.service");

/// added 
const {
    generateSchedule
} = require("../utils/scheduleEngine");
//


async function breakdownTaskController(req, res) {

    try {

        const { task, deadline, freeHoursPerDay } = req.body;
        const freeHours = Number(freeHoursPerDay);

        // Basic validation
        if (
    !task ||
    !deadline ||
    freeHoursPerDay === undefined
) {
    return res.status(400).json({
        success: false,
        message: "Task, deadline and freeHoursPerDay are required."
    });
}

        const aiResponse = await breakdownTask(task, deadline);
        const riskAnalysis = calculateRisk({

    deadline,

    totalEstimatedHours:
        aiResponse.total_estimated_hours,

    freeHoursPerDay: freeHours,


    difficulty:
        aiResponse.difficulty

});

    //later added 
    const scheduleAnalysis = generateSchedule({

        subtasks: aiResponse.subtasks,

        deadline,

        freeHoursPerDay: freeHours

    });
    //


    // added/////////////////
    const savedTask = await saveTask({

    task,

    deadline,

    free_hours_per_day: freeHours,

    total_estimated_hours: aiResponse.total_estimated_hours,

    difficulty: aiResponse.difficulty,

    pri_score: riskAnalysis.pri,

    risk_level: riskAnalysis.level,

    recommendation: riskAnalysis.recommendation,

    ai_response: aiResponse,

    // later add
    schedule: scheduleAnalysis

});
    ///////////////////



//         res.json({
//     success:true,
//     taskAnalysis: aiResponse,
//     riskAnalysis
// });

    res.json({
    success: true,

    data: {
        savedTask,
        taskAnalysis: aiResponse,
        riskAnalysis,
        scheduleAnalysis
    }

});

    } catch(error){

    console.error(error);

    res.status(500).json({

        success:false,

        message:error.message

    });

}
}


/// added 
async function getAllTasksController(req, res) {

    try {

        const tasks = await getAllTasks();

        res.json({

            success: true,

            data: tasks

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}
//

module.exports = {
    breakdownTaskController,
    getAllTasksController
};
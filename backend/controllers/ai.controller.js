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




















// /*************************************************/
// const { breakdownTask } = require("../services/gemini.service");

// const { calculateRisk } = require("../utils/riskEngine");

// const { saveTask , getAllTasks } = require("../services/task.service");

// /// added 
// const {
//     generateSchedule
// } = require("../utils/scheduleEngine");
// //


// async function breakdownTaskController(req, res) {

//     console.log("=================================");
//     console.log("Request received!");
//     console.log(req.body);
//     console.log("=================================");

//     try {

//         const { task, deadline, freeHoursPerDay } = req.body;

//         const freeHours = Number(freeHoursPerDay);

//         // Basic validation
//         if (
//     !task ||
//     !deadline ||
//     freeHoursPerDay === undefined
// ) {
//     return res.status(400).json({
//         success: false,
//         message: "Task, deadline and freeHoursPerDay are required."
//     });
// }

//         const aiResponse = await breakdownTask(task, deadline);
//         const riskAnalysis = calculateRisk({

//     deadline,

//     totalEstimatedHours:
//         aiResponse.total_estimated_hours,

//     freeHoursPerDay: freeHours,


//     difficulty:
//         aiResponse.difficulty

// });

//     //later added 
//     const scheduleAnalysis = generateSchedule({

//         subtasks: aiResponse.subtasks,

//         deadline,

//         freeHoursPerDay: freeHours

//     });
//     //


//     // added/////////////////
//     const savedTask = await saveTask({

//     task,

//     deadline,

//     free_hours_per_day: freeHours,

//     total_estimated_hours: aiResponse.total_estimated_hours,

//     difficulty: aiResponse.difficulty,

//     pri_score: riskAnalysis.pri,

//     risk_level: riskAnalysis.level,

//     recommendation: riskAnalysis.recommendation,

//     ai_response: aiResponse,

//     // later add
//     schedule: scheduleAnalysis

// });
//     ///////////////////



// //         res.json({
// //     success:true,
// //     taskAnalysis: aiResponse,
// //     riskAnalysis
// // });

//     res.json({
//     success: true,

//     data: {
//         savedTask,
//         taskAnalysis: aiResponse,
//         riskAnalysis,
//         scheduleAnalysis
//     }

// });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }
// }
// ////////////



// /// added 
// async function getAllTasksController(req, res) {

//     try {

//         const tasks = await getAllTasks();

//         res.json({

//             success: true,

//             data: tasks

//         });

//     }

//     catch (error) {

//         console.error(error);

//         res.status(500).json({

//             success: false,

//             message: error.message

//         });

//     }

// }
// //

// module.exports = {
//     breakdownTaskController,
//     getAllTasksController
// };





























const { breakdownTask } = require("../services/gemini.service");
const { calculateRisk } = require("../utils/riskEngine");
const { generateSchedule } = require("../utils/scheduleEngine");

const {
    saveTask,
    getAllTasks
} = require("../services/task.service");

async function breakdownTaskController(req, res) {

    console.log("=================================");
    console.log("Request received!");
    console.log(req.body);
    console.log("=================================");

    try {

        const { task, deadline, freeHoursPerDay } = req.body;

        const freeHours = Number(freeHoursPerDay);

        // Validation
        if (
            !task ||
            !task.trim() ||
            !deadline ||
            !deadline.trim() ||
            freeHoursPerDay === undefined ||
            freeHoursPerDay === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Task, deadline and freeHoursPerDay are required."
            });
        }

        console.log("STEP 1 : Calling Gemini");

        const aiResponse = await breakdownTask(task, deadline);

        console.log("STEP 2 : Gemini Finished");

        const riskAnalysis = calculateRisk({

            deadline,

            totalEstimatedHours:
                aiResponse.total_estimated_hours,

            freeHoursPerDay: freeHours,

            difficulty:
                aiResponse.difficulty

        });

        console.log("STEP 3 : Risk Done");

        const scheduleAnalysis = generateSchedule({

            subtasks: aiResponse.subtasks,

            deadline,

            freeHoursPerDay: freeHours

        });

        console.log("STEP 4 : Schedule Done");

        const savedTask = await saveTask({

            task,

            deadline,

            free_hours_per_day: freeHours,

            total_estimated_hours:
                aiResponse.total_estimated_hours,

            difficulty:
                aiResponse.difficulty,

            pri_score:
                riskAnalysis.pri,

            risk_level:
                riskAnalysis.level,

            recommendation:
                riskAnalysis.recommendation,

            ai_response:
                aiResponse,

            schedule:
                scheduleAnalysis

        });

        console.log("STEP 5 : Saved to Supabase");

        console.log("STEP 6 : Preparing response");

        const responseData = {

            success: true,

            data: {

                savedTask,

                taskAnalysis: aiResponse,

                riskAnalysis,

                scheduleAnalysis

            }

        };

        console.log("STEP 7 : Sending response");

        return res.status(200).json(responseData);

    } catch (error) {

        console.error("CONTROLLER ERROR:", error);

        if (!res.headersSent) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

async function getAllTasksController(req, res) {

    try {

        const tasks = await getAllTasks();

        return res.status(200).json({

            success: true,

            data: tasks

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {
    breakdownTaskController,
    getAllTasksController
};
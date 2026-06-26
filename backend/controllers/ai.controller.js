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

        res.json({

    success:true,

    taskAnalysis: aiResponse,

    riskAnalysis

});

    } catch(error){

    console.error(error);

    res.status(500).json({

        success:false,

        message:error.message

    });

}

}

module.exports = {
    breakdownTaskController
};
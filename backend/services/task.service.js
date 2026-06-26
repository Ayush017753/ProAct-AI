const supabase = require("../config/supabase");

async function saveTask(taskData) {

    const { data, error } = await supabase
        .from("tasks")
        .insert([taskData])
        .select();

    if (error) {
        throw new Error(error.message);
    } 

    return data[0];
}

async function getAllTasks() {

    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}



module.exports = {
    saveTask,
    getAllTasks
};
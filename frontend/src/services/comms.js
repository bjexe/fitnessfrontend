import axios from 'axios'
const workoutBaseUrl = '/api/workouts'
const templateBaseUrl = '/api/templates'

let token = null

function setToken(newToken) {
    token = `bearer ${newToken}`
    console.log(`successfully set the token as: ${newToken}`)
}

function getAllWorkouts() {
    const request = axios.get(workoutBaseUrl)
    return request.then(response => response.data)
}

async function createWorkout(workout) {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(workoutBaseUrl, workout, config)
    return response.data
}

function updateWorkout(id, workout) {
    const config = {
        headers: {Authorization: token}
    }
    const request = axios.put(`${workoutBaseUrl}/${id}`, workout, config)
    return request.then(response => response.data)
}

function getAllTemplates() {
    const request = axios.get(templateBaseUrl)
    return request.then(response => response.data)
}

async function createTemplate(template) {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(templateBaseUrl, template, config)
    return response.data
}

function updateTemplate(id, template) {
    const config = {
        headers: {Authorization: token}
    }
    const request = axios.put(`${templateBaseUrl}/${id}`, template, config)
}

export default {getAllWorkouts, createWorkout, updateWorkout, setToken, getAllTemplates, createTemplate, updateTemplate}
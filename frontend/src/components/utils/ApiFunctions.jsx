import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/* This function add a Room-Types to database */
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status === 201){
        console.log("A new-room was added successfully")
        return true
    }
    else{
        return false
    }
}

/* This function get all Room-Types from database */
export async function getRoomTypes(){
    try{
        const response = await api.get("rooms/room/types")
        console.log(" this api called")
        return response.data
    }catch(error){
        throw new Error("Error fetching room types")
    }
}

/* This function get all Rooms from database */
export async function getAllRooms(){
    try{
        const result = await api.get("rooms/allRooms")
        console.log("All rooms sent successfully  ", result)
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

/* This function delete Room */
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`rooms/room/delete/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/room/update/${roomId}`,formData)
    return response
}

export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function registration(registration){
    try{
        const response = await api.post("/auth/register-user", registration)
        return response.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`User registration error ${error.message}`)
        }
    }
}

export async function loginUser(login){
    try{
        const response = await api.post("/auth/login", login)
        if(response.status >= 200 && response.status < 300){
            return response.data
        }
        else{
            return null
        }   
    }catch(error){
       console.log(error)
    }
}

export async function getUserProfile(userId, token){
    try{
        const response = await api.get(`/users/profile/${userId}`, {
            header : getHeader()
        })
        return response.data 
    }catch(error){
        console.log(error);
    }
}
import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {

    const [room, setRoom] = useState({
        photo : "",
        roomType : "",
        roomPrice : ""
    });

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {roomId} = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({...room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setRoom({...room, [name]: value})
    }

    useEffect(() => {
        const fetchRoom = async () => {
            console.log("checking fetch room working ")
            try{
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
                console.log("roomdata ", roomData)
            }catch(error){
                console.log(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await updateRoom(roomId, room)
            if(response.status === 200){
                setSuccessMessage("Room updated successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error updating room")
            }
        }catch(error){
            console.log(error)
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }

    return (
        <div>
            <div>
                <h3>Edit Room</h3>
                {successMessage && (
                    <div>{successMessage}</div>
                )}
                {errorMessage && (
                    <div>{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="roomType" className="form-label">Room Type</label>
                        <input 
                            className="form-control" required
                            id="roomType"
                            name="roomType"
                            type="text"
                            value={room.roomType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="roomPrice" className="form-label">Room Price</label>
                        <input 
                            className="form-control" required
                            id="roomPrice"
                            name="roomPrice"
                            type="number"
                            value={room.roomPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="photo" className="form-label">Room Photo</label>
                        <input 
                            className="form-control" required
                            id="photo"
                            name="photo"
                            type="file"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img src={`data:image/jpeg;base64,${imagePreview}`} alt="Preview Room" style={{maxWidth: "400px", maxHeight: "400px"}}></img>
                        )}
                    </div>
                   
                    <div>
                        <Link to={"/existing-rooms"}>
                            Back
                        </Link>
                        <button type='submit'>
                            Edit Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditRoom

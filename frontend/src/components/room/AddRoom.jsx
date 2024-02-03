import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom';

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    });

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value)
            }
            else{
                value = ""
            }  
        }
        setNewRoom({...newRoom, [name]: value});
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("A new room was added!")
                setNewRoom({photo: null, roomType: "", roomPrice: ""})
                setImagePreview("")
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error adding room")
            }
        }catch(error){
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
                <h2>Add a Room type</h2>
                {successMessage && (
                    <div>{successMessage}</div>
                )}
                {errorMessage && (
                    <div>{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="roomType" className="form-label">Room Type</label>
                        <div>
                            <RoomTypeSelector 
                                handleRoomInputChange={handleRoomInputChange} 
                                newRoom={newRoom}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="roomPrice" className="form-label">Room Price</label>
                        <input 
                            className="form-control" required
                            id="roomPrice"
                            name="roomPrice"
                            type="number"
                            value={newRoom.roomPrice}
                            onChange={handleRoomInputChange}
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
                            <img src={imagePreview} alt="Preview Room Photo" style={{maxWidth: "400px", maxHeight: "400px"}}></img>
                        )}
                    </div>

                    <div>
                        <Link to={"/existing-rooms"}>
                            Back
                        </Link>
                        <button type='submit'>
                            Save Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRoom

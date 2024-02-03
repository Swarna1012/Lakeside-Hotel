import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
  const [roomTypes, setRoomTypes] = useState([])
  const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false)
  const [newRoomTypes, setNewRoomTypes] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
        setRoomTypes(data)
    })
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomTypes(e.target.value);
  }

  const handleAddNewRoomType = () => {
    if(newRoomTypes !== ""){
        setRoomTypes([...roomTypes, newRoomTypes])
        setNewRoomTypes("")
        setShowNewRoomTypesInput(false)
    }
  }

  return (
    <div>
      <div>
        <select
            id='roomType'
            name='roomType'
            value={newRoom.roomType}
            onChange={(e) => {
                if(e.target.value === "Add New"){
                    setShowNewRoomTypesInput(true)
                }
                else{
                    handleRoomInputChange(e)
                }
            }}>
            <option value={""}> select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (       
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
        {showNewRoomTypesInput && (
            <div>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Enter a new room type'
                    onChange={handleNewRoomTypeInputChange}
                />
                <button type='button' onClick={handleAddNewRoomType}>Add</button>
            </div>
        )}
      </div>
    </div>
  )
}

export default RoomTypeSelector

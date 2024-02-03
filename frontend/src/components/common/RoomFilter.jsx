import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

  return (
    <div>
        <span>Filter rooms by type</span>
        <select
            className=''
            value={filter}
            onChange={handleSelectChange}>
                <option value={""}> select a room type to filter...</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
        </select>
        <button type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default RoomFilter
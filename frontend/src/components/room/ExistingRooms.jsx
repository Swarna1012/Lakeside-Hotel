import React, { useEffect, useState } from 'react'
import {deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { FaTrash } from "react-icons/fa6";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom'


const ExistingRooms = () => {
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async() => {
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            console.log("results existing rooms ", result)
            setRooms(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }
        else{
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async(roomId) => {
        try{
            const result = await deleteRoom(roomId)
            if(result === ""){
                console.log("Room was deleted")
                setSuccessMessage(`Room No ${roomId} was deleted`)
                fetchRooms()
            }
            else{
                console.error(`Error deleting room: ${result.message}`)
            }
        }catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length >0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms/roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = currentPage - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
    console.log("current rooms  ",currentRooms)

  return (
    <>
        {isLoading ? (<p>Loading existing rooms</p>) :
            (<>
            <section>
                <div>
                    <h2>Existing Rooms</h2>
                    <Link to={"/add-room"}>
                    <FaPlus /> Add Room
                    </Link>
                </div>
                <div className='col'>
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td>
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span><HiViewfinderCircle /></span>
                                        <span><FaEdit /></span>
                                    </Link>
                                    <button onClick={() => handleDelete(room.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <RoomPaginator 
                    currentPage={currentPage}
                    totalPages={calculateTotalPages(filteredRooms, rooms)}
                    onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
    </>
  )
}

export default ExistingRooms
import React, { useState, useEffect } from 'react'
import './Leaderboard.css';
import axios from 'axios';
const Leaderboard = () => {

    const [records, setRecords] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8090/api/collections/leaderboard/records?sort=-wpm,id").then((data) => {
            setRecords(data.data.items);
        });
    }, []);

    return (
        <div className='Leaderboard'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">date</th>
                        <th scope="col">wpm</th>
                    </tr>
                </thead>
                <tbody>
                    {records &&
                        records.map(item => (
                            <tr>
                                <th scope="row">1</th>
                                <td>{item.username}</td>
                                <td>{item.created}</td>
                                <td>{item.wpm}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard
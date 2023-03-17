import React from 'react'
import './Leaderboard.css';
const Leaderboard = () => {
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
                    <tr>
                        <th scope="row">1</th>
                        <td>foobar99</td>
                        <td>11 jan 2023 19:07</td>
                        <td>177</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>mgradic</td>
                        <td>2 feb 2023 16:44</td>
                        <td>143</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>vojko2</td>
                        <td>5 oct 2022 9:32</td>
                        <td>88</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard
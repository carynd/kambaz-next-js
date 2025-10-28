"use client";
import { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 }
    ]);
    const addElement = () => {
        const newId = Math.max(...array.map(item => item.id), 0) + 1;
        setArray([...array, { id: newId, value: Math.floor(Math.random() * 100) }]);
    };
    const deleteElement = (id: number) => {
        setArray(array.filter((item) => item.id !== id));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button onClick={addElement}>Add Element</button>
            <ul>
                {array.map((item) => (
                    <li key={item.id}> {item.value}
                        <button onClick={() => deleteElement(item.id)}>
                            Delete</button>
                    </li>))}
            </ul>
            <hr />
        </div>);
}

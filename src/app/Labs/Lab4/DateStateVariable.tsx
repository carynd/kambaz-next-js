"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
export default function DateStateVariable() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setStartDate(new Date());
        setMounted(true);
    }, []);
    const dateObjectToHtmlDateString = (date: Date | null) => {
        if (!date) return "";
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${date.getMonth() + 1
            }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
    };

    if (!mounted) return null;

    return (
        <div id="wd-date-state-variables">
            <h2>Date State Variables</h2>
            <h3>{JSON.stringify(startDate)}</h3>
            <h3>{dateObjectToHtmlDateString(startDate)}</h3>
            <FormControl
                type="date"
                defaultValue={dateObjectToHtmlDateString(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <hr /></div>);
}


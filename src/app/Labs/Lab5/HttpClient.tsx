"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

    const fetchWelcomeOnClick = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnClick(message);
    };

    const fetchWelcomeOnLoad = async () => {
        const welcome = await client.fetchWelcomeMessage();
        setWelcomeOnLoad(welcome);
    };

    useEffect(() => {
        fetchWelcomeOnLoad();
    }, []);

    return (
        <div id="wd-http-client">
            <h3>HTTP Client</h3>
            <hr />
            <h4>Requesting on Click</h4>
            <button className="btn btn-primary" onClick={fetchWelcomeOnClick}>
                Fetch Welcome
            </button>
            <div className="mt-2">
                Response from server: <b>{welcomeOnClick}</b>
            </div>
            <hr />
            <h4>Requesting on Load</h4>
            <div>
                Response from server: <b>{welcomeOnLoad}</b>
            </div>
            <hr />
        </div>
    );
}


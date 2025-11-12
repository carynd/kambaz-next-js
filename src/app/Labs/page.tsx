"use client";

export const dynamic = 'force-dynamic';

import Link from "next/link";
import ReduxProvider from "./ReduxProvider";

export default function Labs() {
  return (
    <ReduxProvider>
      <div id="wd-labs">
        <h1>Labs</h1>
        <h3> Name : Caryn D/ Caryn Dsouza</h3>
        <h4> Section : 05</h4>
        <ul>
          <li>
            <Link href="/Labs/Lab1" id="wd-lab1-link">
              Lab 1: HTML Examples{" "}
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab2" id="wd-lab2-link">
              Lab 2: CSS Basics{" "}
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab3" id="wd-lab3-link">
              Lab 3: JavaScript Fundamentals{" "}
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab4" id="wd-lab4-link">
              Lab 4: Maintaining State in React Application{" "}
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab5" id="wd-lab4-link">
              Lab 5: Implementing RESTful Web APIs with Express.js{" "}
            </Link>
          </li>
        </ul>
      </div>
    </ReduxProvider>
  );
}

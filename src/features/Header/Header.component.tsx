import "./Header.styles.scss"
import {BrowserRouter, Link} from "react-router-dom";

export default function Header(){
    return(<>
        <div className={"header-content"}>
            <BrowserRouter>
                <a onClick={() => {window.location.href="/lab1"}}><div className={"option"}><div className={"text"}>Lab1</div></div></a>
                    <a onClick={() => {window.location.href="/lab2"}}><div className={"option"}><div className={"text"}>Lab2</div></div></a>
                        <a onClick={() => {window.location.href="/lab3"}}><div className={"option"}><div className={"text"}>Lab3</div></div></a>
                            <a onClick={() => {window.location.href="/lab4"}}><div className={"option"}><div className={"text"}>Lab4</div></div></a>
                                <a onClick={() => {window.location.href="/lab5"}}><div className={"option"}><div className={"text"}>Lab5</div></div></a>
            </BrowserRouter>
        </div>
    </>)
}
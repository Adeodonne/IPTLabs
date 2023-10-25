import PseudoRandomNumbers from "../../../../models/Lab1/PseudoRandomNumbers";
import "./PreviousResult.styles.scss"
import {useEffect, useState} from "react";

interface Props{
    generatedNumbers : PseudoRandomNumbers
}
export default function PreviousResultComponent({generatedNumbers}: Props){

    const [date, setDate] = useState()

    useEffect(() => {
        if (generatedNumbers.date !== null){
            let currentDate : any = generatedNumbers.date
            setDate(currentDate.toString())
        }
    }, [generatedNumbers])

    return(<>
        <div className={"previousResultContent"}>
            <div className={"date"}>{date}</div>
            <div>m:{generatedNumbers.m}</div>
            <br/>
            <div>a:{generatedNumbers.a}</div>
            <br/>
            <div>c:{generatedNumbers.c}</div>
            <br/>
            <div>X0:{generatedNumbers.x0}</div>
            <br/>
            <div>n:{generatedNumbers.n}</div>
            <br/>
            <div>period:{generatedNumbers.period}</div>
            <br/>
            <div>x:{generatedNumbers.x?.join(", ")}</div>
        </div>
    </>)
}
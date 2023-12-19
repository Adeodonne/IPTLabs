import {Button, Form, Input} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import {useEffect, useState} from "react";
import Validator from "./components/Validator/Validator";
import {MAX_N} from "../../constants/Lab1Constant/Lab1Constants";
import TextArea from "antd/es/input/TextArea";
import PreviousResultComponent from "./components/PreviousResult/PreviousResult.component";
import PseudoRandomNumbers from "../../models/Lab1/PseudoRandomNumbers";
import Errors from "../../models/Lab1/Errors";
import "./Lab1.styles.scss";

export default function Lab1(){

    const localStorage = window.localStorage;
    const [form] = Form.useForm();
    const validator : Validator = new Validator();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [results, setResults] = useState<PseudoRandomNumbers[]>([]);
    const [errors, setErrors] = useState<Errors>(
        {mError : "m has to be more than 0 and integer",
            aError: "a has to be more than or equal to 0, less than m and integer",
            cError: "c has to be more than or equal to 0, less than m and integer",
            X0Error: "X0 has to be more than or equal to 0, less than m and integer",
            nError: "n has to be more than 0 and less than " + MAX_N}
    );


    const GetResult = () => {
        const newResult : PseudoRandomNumbers = {
            m : Number(form.getFieldValue("m")),
            a : Number(form.getFieldValue("a")),
            c : Number(form.getFieldValue("c")),
            x0 : Number(form.getFieldValue("x0")),
            n : Number(form.getFieldValue("n")),
        }

        const randomNumbers = CalculateRandomNumbers(newResult)
        newResult.period = randomNumbers.period
        newResult.x = randomNumbers.result
        let addToArray = false
        if (results.length != 0) {
            for (let property in newResult) {
                if (property !== "x" && property !== "period") {
                    if ((newResult as any)[property] !== (results[results.length - 1] as any)[property]) {
                        addToArray = true
                        break
                    }
                }
            }
        } else {
            addToArray = true
        }

        newResult.date = new Date();
        if(addToArray){
            setResults([...results, newResult])
            localStorage.setItem("results", JSON.stringify([...results, newResult]))
        }

        form.setFieldValue("result", randomNumbers.result)
        form.setFieldValue("period", randomNumbers.period)
    }

    const CalculateRandomNumbers = (props : PseudoRandomNumbers) => {
        let n = props.n - 1
        let xn = props.x0
        let period = 1
        const tempResult = []
        let numbers: number[] = []

        while (true){
            const x = (props.a * xn + props.c) % props.m
            tempResult.push(x)
            xn = x
            n -= 1
            
            if (n === 0) numbers = tempResult

            if (!tempResult.includes(props.x0)) period += 1

            if (n < 0 && tempResult.includes(props.x0)) break
        }

        return {period: period, result: numbers}
    }

    const ClearResults = () => {
        setResults([])
        localStorage.setItem("results", "")
    }

    useEffect(() => {
        errors?.mError === "" ? setDisabled(false) : setDisabled(true)
        
        let toDisableButton = false
        for(const error in errors)
            if ((errors as any)[error + ""] !== "") toDisableButton = true
        setDisabledButton(toDisableButton)
    }, [errors])

    useEffect(() => {
        const savedResults = localStorage.getItem("results")
        if(savedResults != null && savedResults !== ""){
            setResults(JSON.parse(savedResults))
        }
    }, [])

    return(
        <>
            <Form className={"form"}
            layout="vertical"
            form={form}
            >
                <FormItem
                    label="m:"
                    name="m"
                >
                    <Input onChange={() => setErrors({...errors, mError : validator.ValidateM(form.getFieldValue("m"))})} />
                </FormItem>
                <div className={"error"}>{errors?.mError}</div>

                <FormItem
                    label="a:"
                    name="a"
                >
                    <Input disabled={disabled}
                           onChange={
                            () => setErrors(
                                {...errors,
                                    aError : validator.ValidateAnotherProps(form.getFieldValue("a"), form.getFieldValue("m"), "a")
                                })
                    }/>
                </FormItem>
                <div className={"error"}>{errors?.mError === "" ? errors?.aError : <></>}</div>

                <FormItem
                    label="c:"
                    name="c"
                >
                    <Input disabled={disabled} onChange={
                        () => setErrors(
                            {...errors,
                                cError : validator.ValidateAnotherProps(form.getFieldValue("c"), form.getFieldValue("m"), "c")
                            })
                    } />
                </FormItem>
                <div className={"error"}>{errors?.mError === "" ? errors?.cError : <></>}</div>

                <FormItem
                    label="X0:"
                    name="x0"
                >
                    <Input disabled={disabled} onChange={
                        () => setErrors(
                            {...errors,
                                X0Error : validator.ValidateAnotherProps(form.getFieldValue("x0"), form.getFieldValue("m"), "X0")
                            })
                    } />
                </FormItem>
                <div className={"error"}>{errors?.mError === "" ? errors?.X0Error : <></>}</div>

                <FormItem
                    label={"n(max "+ MAX_N + "):"}
                    name="n"
                >
                    <Input disabled={disabled} onChange={
                        () => setErrors(
                            {...errors,
                                nError : validator.ValidateN(form.getFieldValue("n"))
                            })
                    } />
                </FormItem>
                <div className={"error"}>{errors?.mError === "" ? errors?.nError : <></>}</div>

                <div className="center">
                    <Button htmlType="submit" disabled={disabledButton} onClick={GetResult}>
                        Calculate
                    </Button>
                </div>

                <FormItem
                    label="Period:"
                    name="period">
                    <Input onKeyDown={(e) => {e.preventDefault()}} onPaste={(e) => {e.preventDefault()}} />
                </FormItem>

                <FormItem
                    label="Result:"
                    name="result"
                >
                    <TextArea style={{height: 300}} onKeyDown={(e) => {e.preventDefault()}} onPaste={(e) => {e.preventDefault()}} />
                </FormItem>

                <div>
                    <Button htmlType="submit" onClick={() => ClearResults()}>
                        Clear previous results
                    </Button>
                </div>
            </Form>

            {results.slice(0).reverse().map((item, index) => {
                return(<PreviousResultComponent generatedNumbers={item} />)
            })}
        </>)
}
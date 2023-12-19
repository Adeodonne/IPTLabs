import "./Lab2.styles.scss";
import {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios, {all} from "axios";
import MD5HashItem from "../../models/Lab2/MD5HashItem";

export default function Lab2(){

    const [form] = Form.useForm();
    const [allHash, setAllHash] = useState<Array<MD5HashItem>>([]);

    const GetHash = () => {
        let text = form.getFieldValue("message");
        if (text == undefined) text = "";

        axios.post(process.env.REACT_APP_BACKEND_URL + "/Md5", {
            "text": text,
            "date": Date().toString()
        }).then(result =>{setAllHash([...allHash, result.data]) });
    }

    const DeleteHash = (id : string) => {
        setAllHash(prev => prev.filter(item => item.id != id));
        axios.delete(process.env.REACT_APP_BACKEND_URL + "/Md5/" + id);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/Md5")
            .then(result =>{ setAllHash(result.data.slice(0).reverse()) });
    }, [])

    return(<>
        <Form className={"form"}
              layout="vertical"
              form={form}
        >
            <FormItem
                label="Message:"
                name="message"
            >
                <Input/>
            </FormItem>

            <div className="center">
                <Button htmlType="submit"  onClick={GetHash}>
                    Calculate
                </Button>
            </div>
        </Form>

        <div className={"centeredTable"}>
            {allHash.map((item : MD5HashItem) => {
                return (<div>{item.text} - {item.hash} <Button onClick={() => DeleteHash(item.id)}>Delete</Button></div>)
            })}
        </div>
    </>)
}
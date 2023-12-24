import { useEffect, useState } from "react"
import TodoApi from "../api/TodoApi";
import { useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "bootstrap/dist/css/bootstrap.min.css";

const todoApi = new TodoApi();

export default function UpdateTodoComponent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expiredDate, setExpiredDate] = useState([2023, 5, 10]);
    const [done, setDone] = useState(false);
    const {id} =  useParams();

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    
    
    const getTodo = () => {
        todoApi.getById(id)
            .then((response)=> {
                console.log(response)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setExpiredDate(response.data.expiredDate)
                setDone(response.data.done)
            }).catch(console.log)
    }

    useEffect(getTodo, [id])
        
    let initialValues = {title, description, expiredDate: new Date(expiredDate), done };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }
    
    const onSubmit = (values, {setSubmitting })=> {
        const data = {
            title: values.title,
            description: values.description,
            expiredDate: formatDate(values.expiredDate),
            done: values.done
        }
    
        todoApi.update(id, data).then(()=> getTodo()).catch(console.log);
        
    }

    return (
        <div className="container">
            <h1> Update todo </h1>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                <Form className="form">
                    <div className="mb-3">
                    <label className="form-label" htmlFor="title">Title:</label>
                    <Field type="text" id="title" name="title"  className="form-control" />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                    <label className="form-label" htmlFor="description">Description:</label>
                    <Field as="textarea" id="description" name="description"  className="form-control" />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Done? </label>
                        <Field type="checkbox" id="done" name="done"  className="form-check-input" />
                        <ErrorMessage name="done" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                    <label className="form-label" htmlFor="ExpiredDate">Expired Date:</label>
                    <Field name="expiredDate"  className="form-control" >
                        {({ field, form }) => (
                        <DatePicker
                            className="form-control"
                            id="expiredDate"
                            selected={field.value}
                            onChange={(expiredDate) => form.setFieldValue('expiredDate', expiredDate)}
                            dateFormat="yyyy-MM-dd"
                        />
                        )}
                    </Field>
                    <ErrorMessage name="expiredDate" component="div" className="text-danger" />
                    </div>


                    <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-warning">Update</button>
                    </div>
                </Form>
            </Formik>

        </div>
    )
}
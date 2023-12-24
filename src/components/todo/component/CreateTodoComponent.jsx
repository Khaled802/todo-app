import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import TodoApi from "../api/TodoApi";
import { useAuthContext } from "../security/AuthContext";

const todoApi = new TodoApi();

export default function CreateTodoComponent() {

    const navigate = useNavigate();

    const { getUsername } = useAuthContext()

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }
    
    const onSubmit = (values, {setSubmitting })=> {
      
        console.log()
        const data = {
            title: values.title,
            description: values.description,
            expiredDate: formatDate(values.expiredDate),
            done: false
        }
    
        todoApi.create(getUsername(), data).then(()=> navigate("/todos")).catch(console.log);
    }

    return (
        <div className="container">
            <h1> Add todo </h1>
            <Formik
                initialValues={{ title: '', description: '', expiredDate: new Date()}}
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
                    <button type="submit" className="btn btn-success"> Add Todo </button>
                    </div>
                </Form>
            </Formik>

        </div>
    )
}
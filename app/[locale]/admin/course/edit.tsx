import { SimpleForm, Create, required, TextInput, Edit } from "react-admin";

export const CourseEdit = () => {
    return(
        <Edit>
            <SimpleForm>
                <TextInput source="id"  label="id" validate={[required()]}/>
                <TextInput source="title"  label="Title" validate={[required()]}/>
                <TextInput source="imageSrc"  label="Image" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    );
};
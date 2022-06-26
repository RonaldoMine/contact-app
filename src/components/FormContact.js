import {AutoFields, AutoForm, ErrorsField, SubmitField} from "uniforms-material";
import {bridge as schema} from "../schemas/Contact.ts";
import {useMutation} from "@apollo/client";
import {parse} from "graphql/language/parser";

const ADD_CONTACT = parse(`
    mutation CreateContact($contact: ContactInput) {
        createContact (contact: $contact){
            lastname
            name
            email
            phone
            town
            province
            zipCode
            country
            comment1
            comment2
        }
    }
`);

function submitForm(mutation, datas) {
    const [addContact, {loading, error }] = mutation;
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    addContact({
        variables: {
            contact: {
                lastname: datas.lastname,
                name: datas.name,
                email: datas.email,
                phone: datas.phone,
                town: datas.town,
                province: datas.province,
                zipCode: datas.zipCode,
                country: datas.country,
                comment1: datas.comment1,
                comment2: datas.comment2
            }
        }
    })
}

export default function FormContact() {
    const mutation = useMutation(ADD_CONTACT);
    return (
        <AutoForm
            schema={schema}
            onSubmit={(model) => submitForm(mutation, model)}
        >
            <AutoFields element="section"
                         fields={['lastname', 'name']} />
            <ErrorsField/>
            <SubmitField>Enregisrer</SubmitField>
        </AutoForm>
    );
}

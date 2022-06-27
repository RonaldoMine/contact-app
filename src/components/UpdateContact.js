import {useMutation, useQuery} from "@apollo/client";
import {parse} from "graphql/language/parser";
import {useParams} from "react-router-dom";
import {AutoField, AutoForm, ErrorsField, SubmitField} from "uniforms-material";
import {bridge as schema} from '../schemas/Contact.ts'
import {useCallback, useEffect, useState} from "react";
import {cloneDeep} from "@apollo/client/utilities";

const FIND_CONTACT = parse(`
    query FindContact($data: ID) {
      findContact(data: $data){
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
const UPDATE_CONTACT = parse(`
    mutation UpdateContact($updateContactId: ID, $contact: ContactInput) {
      updateContact(id: $updateContactId, contact: $contact)
    }
`);


export default function UpdateContact() {
    let {ID} = useParams();
    const mutation = useMutation(UPDATE_CONTACT)
    let contact;
    const {loading, error, data} = useQuery(FIND_CONTACT, {
        variables: {
            data: `${ID}`
        }
    });
    useEffect(() => {
        if (!loading) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            contact = data.findContact;
            onChangeModel(contact)
        }
    }, [loading])
    const [model, setModel] = useState();
    const onChangeModel = useCallback(model => {
        // Making a deep copy is one on the options.
        model = cloneDeep(model);
        if (!loading) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            contact = data.findContact;
            model.name = contact.name
            model.lastname = contact.lastname
            model.email = contact.email
            model.phone = contact.phone
            model.town = contact.town
            model.province = contact.province
            model.zipCode = contact.zipCode
            model.country = contact.country
            model.comment1 = contact.comment1
            model.comment2 = contact.comment2
            console.log(model)
        }
        setModel(model);
    }, [loading, setModel]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    function submitForm(datas, ID) {
        console.log(datas)
        const [updateContact, {loading, error}] = mutation;
        updateContact({
            variables: {
                updateContactId: ID,
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
        }).then(r => alert('Contact mise à jour'))
        if (loading) console.log('Updating...');
        if (error) console.log(`Update error error! ${error.message}`);
    }

    return (
        <div>
            <h3>Mise à jour des informations du contact : {data.findContact.lastname + " " + data.findContact.name}</h3>
            <AutoForm schema={schema}
                      model={model}
                      onSubmit={(model) => submitForm(model, ID)}
                      onChangeModel={onChangeModel}
            >
                <AutoField name="name"/>
                <AutoField name="lastname"/>
                <AutoField name="email"/>
                <AutoField name="phone"/>
                <AutoField name="town"/>
                <AutoField name="province"/>
                <AutoField name="zipCode"/>
                <AutoField name="country"/>
                <AutoField name="comment1"/>
                <AutoField name="comment2"/>
                <ErrorsField/>
                <SubmitField>Mettre à jour</SubmitField>
            </AutoForm>
        </div>
    );
}

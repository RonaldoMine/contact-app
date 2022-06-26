import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';
const contactSchema = parse(`
    type Contact {
        lastname: String!
        name: String!
        email: String!
        phone: String!
        town: String!
        province: String!
        zipCode: String!
        country: String!
        comment1: String
        comment2: String
    }
     type Query { anything: ID }
`);
let details = [];
function validator(type, value, input, text = '') {
    let regex;
    let message;
    switch (type){
        case "Email":
            regex = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
            message = 'Vous dévez renseigner une adresse email valide'
            break
        case "Phone":
            regex = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
            message = 'Vous dévez renseigner un numéro de téléphone invalide'
            break
        case "ZipCode":
            regex = /^[A-Z]{1}\d{1}[A-Z]{1} \d{1}[A-Z]{1}\d{1}$/;
            message = 'Votre code postal doit être sous ce format A9A 9A9'
            break
        default:
            regex = /^/;
            message = "Le champs '"+text+"' est obligatoire"
             break;
    }
    if (!value || !regex.test(value)){
        details.push({name: input, message: message})
    }
}
// @ts-ignore
export const bridge = new GraphQLBridge(buildASTSchema(
    contactSchema
).getType('Contact'), function (model) {
    details = []
    validator('String', model.lastname, 'lastname', 'Prénom')
    validator('String', model.name, 'name', 'Nom')
    validator('Phone', model.phone, 'phone', 'Téléphone')
    validator('Email', model.email, 'email')
    validator('String', model.town, 'town', 'Ville')
    validator('String', model.province, 'province', 'Province')
    validator('ZipCode', model.zipCode, 'zipCode', 'Code Postal')
    validator('String', model.country, 'country', 'Pays')
    if (details.length)
        return { details };
}, {
    lastname: { label: 'Prénom' },
    name: { label: 'Nom' },
    email: { label: 'Addresse email' },
    phone: { label: 'Téléphone' },
    town: { label: 'Ville' },
    province: { label: 'Province' },
    zip: { label: 'Code postal' },
    country: { label: 'Pays' },
    comment1: { label: 'Commentaire' },
    comment2: { label: 'Autre Commentaire' }
});
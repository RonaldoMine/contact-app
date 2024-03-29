import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {parse} from "graphql/language/parser";
import makeStyles from "@material-ui/styles/makeStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
    Button,
    ButtonGroup,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Link} from "react-router-dom";

const CONTACTS_LIST = parse(`
    query Contacts {
        contacts {
            _id,
            lastname,
            name,
            phone,
            email,
            town,
            province,
            zipCode,
            country,
            comment1,
            comment2
        }
    }
`);
const CONTACTS_DELETE = parse(`
    mutation DeleteContact($data: ID) {
        deleteContact(data: $data)
    }
`);

function getModalStyle() {
    const top = 50 + Math.round(Math.random() * 20) - 10;
    const left = 50 + Math.round(Math.random() * 20) - 10;
    return {
        'top': `${top}%`,
        'left': `${left}%`,
        'transform': `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(({
    table: {
        minWidth: 650,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: `#fff`,
        border: '2px solid #000',
        padding: 10,
        top: `${getModalStyle().top}`,
        left: `${getModalStyle().left}`,
        transform: `${getModalStyle().transform}`
    },
}));
export default function ListContact() {
    const classes = useStyles();
    const [textModal, setTextModal] = useState('Suppréssion en cours ...');
    const [modalIsOpen, setModalOpen] = useState(false);
    const {loading, error, data} = useQuery(CONTACTS_LIST);
    const [deleteContact, {errorDelete}] = useMutation(CONTACTS_DELETE);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <h2>Liste des contacts dans la BD</h2>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Noms et Prénoms</TableCell>
                            <TableCell>Téléphones</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ville</TableCell>
                            <TableCell>Province</TableCell>
                            <TableCell>Code Postal</TableCell>
                            <TableCell>Pays</TableCell>
                            <TableCell>Commentaire 1</TableCell>
                            <TableCell>Commentaire 2</TableCell>
                            <TableCell align="center">#</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell> {contact.lastname + ' ' + contact.name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.town}</TableCell>
                                <TableCell>{contact.province}</TableCell>
                                <TableCell>{contact.zipCode}</TableCell>
                                <TableCell>{contact.country}</TableCell>
                                <TableCell>{contact.comment1}</TableCell>
                                <TableCell>{contact.comment2}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained" color="primary"
                                                 aria-label="contained button group">
                                        <Button color="default"><Link to={'/contact/update/'+contact._id}><EditIcon/></Link></Button>
                                        <Button color="secondary"
                                                onClick={() => {
                                                    setModalOpen(true)
                                                    deleteContact({
                                                        variables: {
                                                            data: contact._id
                                                        }
                                                    }).then(r => {
                                                        setTimeout(() => {
                                                            setTextModal('Le contact ayant pour adresse ' + contact.email+ ' vient d\'être supprimé')
                                                        }, 1000)
                                                    })
                                                }}><DeleteIcon/></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalOpen(false)
                    window.location.reload()
                }}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Suppression</h2>
                    <p id="simple-modal-description">
                        {errorDelete && setTextModal('Erreur lors de suppréssion')}
                        { textModal }
                    </p>
                </div>
            </Modal>
        </div>
    );
}
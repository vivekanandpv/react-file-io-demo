import React from 'react';
import {httpService} from "../http-service";

const CustomerForm = (props) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [identityProof, setIdentityProof] = React.useState(null);
    const [addressProof, setAddressProof] = React.useState(null);

    const uploadFile = (e) => {
        if (e.target.files[0].size > 5242880) {
            alert("Selected file exceeds acceptable limit (<=5MB)");
            return;
        }

        switch (e.target.name) {
            case 'identityProof': {
                setIdentityProof(_ => e.target.files[0]);
                return;
            }
            case 'addressProof': {
                setAddressProof(_ => e.target.files[0]);
                return;
            }
            default:
                return;
        }
    }

    const handleInput = (e) => {
        switch (e.target.name) {
            case 'firstName': {
                setFirstName(_ => e.target.value);
                return;
            }

            case 'lastName': {
                setLastName(_ => e.target.value);
                return;
            }

            case 'email': {
                setEmail(_ => e.target.value);
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!identityProof || !addressProof) {
            alert("Documents are missing");
            return;
        }

        const formJson = JSON.stringify({
            firstName,
            lastName,
            email
        });

        const data = new FormData();
        data.append('identity-proof', identityProof);
        data.append('address-proof', addressProof);
        data.append('customer', formJson);

        httpService.post('customers', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(r => {
                console.log('Server Response', r);
                alert('Post Success');
                e.reset();
            })
            .catch(e => {
                console.log('Server Error', e);
                alert('Post Failed');
            })
    }

    return (
        <>
            <h4>Customer Form</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" required minLength={3} maxLength={200} className="form-control" id="firstName"
                           name="firstName" onChange={handleInput} value={firstName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" maxLength={200} className="form-control" id="lastName" name="lastName"
                           onChange={handleInput} value={lastName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" required maxLength={200} className="form-control" id="email" name="email"
                           onChange={handleInput} value={email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="identityProof" className="form-label">Identity Proof (up to 5MB)</label>
                    <input required className="form-control" type="file" id="identityProof" name="identityProof"
                           onChange={uploadFile} accept="application/pdf"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="addressProof" className="form-label">Address Proof (up to 5MB)</label>
                    <input required className="form-control" type="file" id="addressProof" name="addressProof"
                           onChange={uploadFile} accept="application/pdf"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default CustomerForm;
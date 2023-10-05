import React from 'react';
import {httpService} from "../http-service";

const CustomerDetails = (props) => {
    const [customer, setCustomer] = React.useState(null);
    const [identityProof, setIdentityProof] = React.useState(null);
    const [addressProof, setAddressProof] = React.useState(null);

    React.useEffect(() => {
        httpService.get('customers/1')
            .then(r => {
                console.log('Server Response', r);
                setCustomer(_ => r.data);
            })
            .catch(e => {
                console.log('Server Error', e);
            })
    }, []);

    const getIdentityProof = () => {
        httpService.get('customers/documents/identity-proof/1', {
            responseType: 'blob',
        })
            .then((response) => {
                const pdfFile = new Blob([response.data], {type: 'application/pdf'});
                setIdentityProof(URL.createObjectURL(pdfFile));
            })
            .catch(e => {
                console.log('Identity Proof Fetching Error', e);
            });
    }

    const getAddressProof = () => {
        httpService.get('customers/documents/address-proof/1', {
            responseType: 'blob',
        })
            .then((response) => {
                const pdfFile = new Blob([response.data], {type: 'application/pdf'});
                setAddressProof(URL.createObjectURL(pdfFile));
            })
            .catch(e => {
                console.log('Address Proof Fetching Error', e);
            });
    }

    return (
        <>
            <h3>Customer Details</h3>
            <hr/>
            <p>First Name: {customer?.firstName}</p>
            <p>Last Name: {customer?.lastName}</p>
            <p>Email: {customer?.email}</p>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={getIdentityProof}>Get Identity Proof</button>
                    <hr/>
                    {identityProof ? <object data={identityProof} width='500' height='400'></object> : null}
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={getAddressProof}>Get Address Proof</button>
                    <hr/>
                    {addressProof ? <object data={addressProof} width='500' height='400'></object> : null}
                </div>
            </div>

        </>
    );
};

export default CustomerDetails;
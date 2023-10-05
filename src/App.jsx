import React from 'react';
import CustomerForm from "./components/CustomerForm";
import CustomerDetails from "./components/CustomerDetails";

const App = (props) => {
    return (
        <>
            <div className="p-5">
                {/*<CustomerForm />*/}
                <CustomerDetails />
            </div>
        </>
    );
};

export default App;
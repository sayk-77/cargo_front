import React, {useEffect, useState} from 'react';
import {HeaderAdmin} from "../../components/Header/HeaderAdmin";
import {CustomerCard} from "../../components/CustomerCard/CustomerCard";

export const Customers = () => {
    const [customers, setCustomers] = useState([])

    const [nameFilter, setNameFilter] = useState('');
    const [addressFilter, setAddressFilter] = useState('');
    const [phoneFilter, setPhoneFilter] = useState('');

    const filteredCustomers = customers.filter(customer => {
        const passNameFilter = !nameFilter ||
            (
                customer.customer_first_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                customer.customer_midle_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                customer.customer_last_name.toLowerCase().includes(nameFilter.toLowerCase())
            );

        const passAddressFilter = !addressFilter || customer.customer_address.toLowerCase().includes(addressFilter.toLowerCase());
        const passPhoneFilter = !phoneFilter || customer.customer_number_phone.includes(phoneFilter);

        return passNameFilter && passAddressFilter && passPhoneFilter;
    });

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetch('http://192.168.0.105:5000/customers',
                    {
                        method: 'GET'
                    })
                const data = await response.json()
                setCustomers(data)
            } catch (ex) {
                console.log(ex)
            }
        }
        getCustomers()
    }, []);

    return(
        <>
            <HeaderAdmin/>
            <article className="filter">
                <label>ФИО:</label>
                <input type="text" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/>

                <label>Адрес:</label>
                <input type="text" value={addressFilter} onChange={(e) => setAddressFilter(e.target.value)}/>

                <label>Номер телефона:</label>
                <input type="text" value={phoneFilter} onChange={(e) => setPhoneFilter(e.target.value)}/>
            </article>
            {
                filteredCustomers.length === 0 ? (
                    <p className="dataNotFound">Нет данных, подходящих под ваши фильтры</p>
                ) : (
                    filteredCustomers.map((customer) => {
                        return (
                            <CustomerCard
                                key={customer.customer_id}
                                customer={customer}
                            />
                        );
                    })
                )
            }
        </>
    )
}
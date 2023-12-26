import React from 'react';
import './customer_card_style.css'

export const CustomerCard = ({customer}) => (
    <>
        <article className="customer-card">
            <h2>{customer.customer_first_name} {customer.customer_midle_name} {customer.customer_last_name}</h2>
            <p>Номер телефона: {customer.customer_number_phone}</p>
            <p>Адрес: {customer.customer_address}</p>
        </article>
    </>
)
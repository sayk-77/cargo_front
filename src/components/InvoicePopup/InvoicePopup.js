import React, {useEffect, useState} from 'react';
import './popup_style.css'

export const InvoicePopup = ({show, onClose, invoiceId, contractId}) => {
    const [invoice, setInvoice] = useState([])

    useEffect(() => {
        const getInvoiceById = async () => {
            const response = await fetch(`http://192.168.0.105:5000/invoice/${invoiceId}`,
                {
                    method: 'GET'
                })

            const data = await response.json()
            setInvoice(data)
        }
        getInvoiceById()
    }, []);

    if (!show) {
        return null;
    }

    const closePopup = () => {
        onClose();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    return (
        <section className="popup" onClick={closePopup}>
            <article className="popup-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closePopup}>
                    &times;
                </span>
                <h2>Накладная для контракта №{contractId}</h2>
                <article className="invoiceInfo">
                    <p>Дата: {formatDate(invoice.invoice_date)}</p>
                    <p>Отправитель: {invoice.sender_name}</p>
                    <p>Получатель: {invoice.recipient_name}</p>
                    <p>Груз: {invoice.invoice_cargo_name}</p>
                    <p>Тип груза: {invoice.invoice_type_cargo}</p>
                    <p>Вес груза: {invoice.invoice_cargo_weight} {invoice.invoice_unit_measure}</p>
                    <p>Цена за единицу: {invoice.invoice_unit_price} USD</p>
                    <p>Общая цена: {invoice.invoice_total_price} USD</p>
                </article>
            </article>
        </section>
    )
}
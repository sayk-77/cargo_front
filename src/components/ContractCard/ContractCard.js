import React, {useState} from 'react';
import './contract_card_style.css'
import {InvoicePopup} from "../InvoicePopup/InvoicePopup";
import {TravelTicketPopup} from "../TravelTicketPopup/TravelTicketPopup";
import {Link} from "react-router-dom";

export const ContractCard = ({contract}) =>  {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showTravelTicketModal, setShowTravelTicketModal] = useState(false);

    const openInvoiceModal = () => {
        setShowInvoiceModal(true);
    };

    const openTravelTicketModal = () => {
        setShowTravelTicketModal(true);
    };

    const closeModals = () => {
        setShowInvoiceModal(false);
        setShowTravelTicketModal(false);
    };


    return (
        <>
            <div className="contracts-container">
                <div key={contract.contract_id} className="contract-card">
                    <article className="contract-title">
                        <h3>Контракт №{contract.contract_id}</h3>
                        <Link to={`/print-document/${contract.contract_id}`}>
                            <button>Печать</button>
                        </Link>
                    </article>
                    <p>Водитель: {contract.driver_name}</p>
                    <p>Груз: {contract.contract_cargo}</p>
                    <p>Отправление: {contract.contract_departure_point}</p>
                    <p>Дата доставки: {contract.formatted_delivery_date}</p>
                    <p>Пункт назначения: {contract.contract_destination}</p>
                    <article className="showInvoiceAndTravelTicket">
                        <button onClick={openInvoiceModal}>Накладная</button>
                        <button onClick={openTravelTicketModal}>Путевой Лист</button>
                    </article>
                </div>
            </div>
            {showInvoiceModal && (
                <InvoicePopup
                    show={showInvoiceModal}
                    onClose={closeModals}
                    invoiceId={contract.contract_invoice}
                    contractId={contract.contract_id}
                />
            )}
            {showTravelTicketModal && (
                <TravelTicketPopup
                    show={showTravelTicketModal}
                    onClose={closeModals}
                    travelTicketId={contract.contract_travel_ticket}
                    contractId={contract.contract_id}
                />
            )}
        </>
    )
}
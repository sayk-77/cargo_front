import React, {useEffect, useState} from 'react';
import './travel_ticket_popup_style.css';

export const TravelTicketPopup = ({ show, onClose, travelTicketId, contractId }) => {
    const [ticket, setTicket] = useState([])

    useEffect(() => {
        const getTicketById = async () => {
            const response = await fetch(`http://192.168.0.105:5000/ticket/${travelTicketId}`,
                {
                    method: 'GET'
                })

            const data = await response.json()
            setTicket(data)
        }
        getTicketById()
    }, []);

    if (!show) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    return (
        <section className="travel-ticket-popup" onClick={onClose}>
            <div className="travel-ticket-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Путевой Лист № {contractId}</h2>
                <p>Дата транспортировки: {formatDate(ticket.ticket_transportation_date)}</p>
                <p>Дата действия: {formatDate(ticket.ticket_valid_date)}</p>
                <p>Водитель: {ticket.driver_name}</p>
                <p>Машина: {ticket.car_info}</p>
            </div>
        </section>
    );
};
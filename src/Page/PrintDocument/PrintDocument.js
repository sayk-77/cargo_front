import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import './prind_document_style.css'

export const PrintDocument = () => {
    const { contractId } = useParams();
    const [dataPrint, setDataPrint] = useState()

    useEffect(() => {
        const getInfoToPrintDocument = async () => {
            const response = await fetch(`http://192.168.0.105:5000/print/${contractId}`,
                {
                    method: 'GET'
                })

            const data = await response.json()
            setDataPrint(data)
            console.log(data)
        }
        getInfoToPrintDocument()
    }, []);

    const printDocument = () => {
        const printContent = document.getElementsByClassName('print-document')[0].innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;

        window.print();

        document.body.innerHTML = originalContent;
        window.location.href = '/contracts'
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    return (
        <>
            <section className="print-document">
                <h1>Печать документа №{contractId}</h1>
                {dataPrint && (
                    <article className="section">
                        <h2>Детали контракта</h2>
                        <p>Груз: {dataPrint.contract_cargo}</p>
                        <p>Дата доставки: {formatDate(dataPrint.contract_delivery_time)}</p>
                        <p>Пункт отправления: {dataPrint.contract_departure_point}</p>
                        <p>Пункт назначения: {dataPrint.contract_destination}</p>
                        <p>Водитель: {dataPrint.driver_name}</p>
                        <p>Цена: {dataPrint.contract_price}</p>
                    </article>
                )}
                {dataPrint && (
                    <article className="section">
                        <h2>Детали накладной</h2>
                        <p>Наименование груза: {dataPrint.invoice_cargo_name}</p>
                        <p>Вес: {dataPrint.invoice_cargo_weight}</p>
                        <p>Дата: {formatDate(dataPrint.invoice_date)}</p>
                        <p>Получатель: {dataPrint.recipient_full_name}</p>
                        <p>Отправитель: {dataPrint.sender_full_name}</p>
                        <p>Общая цена: {dataPrint.invoice_total_price}</p>
                    </article>
                )}
                {dataPrint && (
                    <article className="section">
                        <h2>Детали путевого листа</h2>
                        <p>Дата перевозки: {formatDate(dataPrint.ticket_transportation_date)}</p>
                        <p>Дата действия: {formatDate(dataPrint.ticket_valid_date)}</p>
                        <p>Водитель: {dataPrint.driver_name}</p>
                        <p>Машина: {dataPrint.car_name}</p>
                    </article>
                )}
            </section>
            <button className='btnPrint' onClick={printDocument}>Печать</button>
        </>
    );
};

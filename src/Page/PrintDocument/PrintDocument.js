import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './prind_document_style.css';

export const PrintDocument = () => {
    const { contractId } = useParams();
    const [dataPrint, setDataPrint] = useState();

    useEffect(() => {
        const getInfoToPrintDocument = async () => {
            try {
                const response = await fetch(`http://192.168.0.105:5000/print/${contractId}`, {
                    method: 'GET'
                });

                const data = await response.json();
                setDataPrint(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getInfoToPrintDocument();
    }, [contractId]);

    const printDocument = () => {
        const printContent = document.getElementsByClassName('print-document')[0].innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();

        document.body.innerHTML = originalContent;
        window.location.href = '/contracts';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    return (
        <>
            <section className="print-document">
                <h1>Печать документа №{contractId}</h1>
                <table className="receipt-table">
                    <tbody>
                    <tr>
                        <td className="titleInfoBlock">Детали контракта</td>
                        <td></td>
                    </tr>
                    {dataPrint && (
                        <>
                            <tr>
                                <td>Груз:</td>
                                <td>{dataPrint.contract_cargo}</td>
                            </tr>
                            <tr>
                                <td>Дата доставки:</td>
                                <td>{formatDate(dataPrint.contract_delivery_time)}</td>
                            </tr>
                            <tr>
                                <td>Пункт отправления:</td>
                                <td>{dataPrint.contract_departure_point}</td>
                            </tr>
                            <tr>
                                <td>Пункт назначения:</td>
                                <td>{dataPrint.contract_destination}</td>
                            </tr>
                            <tr>
                                <td>Водитель:</td>
                                <td>{dataPrint.driver_name}</td>
                            </tr>
                            <tr>
                                <td>Цена:</td>
                                <td>{dataPrint.contract_price} USD</td>
                            </tr>
                        </>
                    )}
                    {dataPrint && (
                        <>
                            <tr>
                                <td className="titleInfoBlock">Детали накладной</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Наименование груза:</td>
                                <td>{dataPrint.invoice_cargo_name}</td>
                            </tr>
                            <tr>
                                <td>Вес:</td>
                                <td>{dataPrint.invoice_cargo_weight} {dataPrint.invoice_unit_measure}.</td>
                            </tr>
                            <tr>
                                <td>Дата:</td>
                                <td>{formatDate(dataPrint.invoice_date)}</td>
                            </tr>
                            <tr>
                                <td>Получатель:</td>
                                <td>{dataPrint.recipient_full_name}</td>
                            </tr>
                            <tr>
                                <td>Отправитель:</td>
                                <td>{dataPrint.sender_full_name}</td>
                            </tr>
                            <tr>
                                <td>Общая цена:</td>
                                <td>{dataPrint.invoice_total_price} USD</td>
                            </tr>
                        </>
                    )}
                    {dataPrint && (
                        <>
                            <tr>
                                <td className="titleInfoBlock">Детали путевого листа</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Дата перевозки:</td>
                                <td>{formatDate(dataPrint.ticket_transportation_date)}</td>
                            </tr>
                            <tr>
                                <td>Дата действия:</td>
                                <td>{formatDate(dataPrint.ticket_valid_date)}</td>
                            </tr>
                            <tr>
                                <td>Водитель:</td>
                                <td>{dataPrint.driver_name}</td>
                            </tr>
                            <tr>
                                <td>Машина:</td>
                                <td>{dataPrint.car_name}</td>
                            </tr>
                        </>
                    )}
                    </tbody>
                </table>
            </section>
            <button className='btnPrint' onClick={printDocument}>Печать</button>
        </>
    );
};
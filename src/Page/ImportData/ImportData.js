import React from 'react';
import {HeaderAdmin} from "../../components/Header/HeaderAdmin";
import './import_data_style.css'

export const ImportData = () => {
    const importCSV = async () => {
        const fileInput = document.getElementById('csvFileInput')

        if (fileInput.files.length === 0) {
            alert('Выберите файл для импорта.')
            return
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://192.168.0.105:5000/import', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Данные импортированы');

            } else {
                alert('Ошибка при импорте данных');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    return(
        <>
            <HeaderAdmin />
            <section className="loadFile">
                <input type="file" id="csvFileInput" accept=".csv"/>
                <button onClick={importCSV}>Импортировать CSV</button>
            </section>

        </>
    )
}
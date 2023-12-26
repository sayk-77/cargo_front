import React from 'react';
import './driver_card_style.css'

export const DriverCard = ({driver}) => (
    <>
        <article className="driver-card">
         <h2>{driver.driver_first_name} {driver.driver_midle_name} {driver.driver_last_name}</h2>
            <p>Опыт вождения: {driver.driver_experience} лет</p>
            <p>Любимый автомобиль: {driver.car_brands} {driver.car_model}</p>
            <p>Разрешение на опасные грузы: {driver.driver_permission_dangerous_goods ? 'Да' : 'Нет'}</p>
            <p>Номер водительских прав: {driver.driver_number_car_rights}</p>
        </article>
    </>
);
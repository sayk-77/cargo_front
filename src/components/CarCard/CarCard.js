import React from 'react';
import './car_card_style.css'

export const CarCard = ({car}) => {
    return (
        <section className="car-card">
            <article className="car-image">
                <img src={`/images/${car.car_image}`} alt={`${car.car_brands} ${car.car_model}`}/>
            </article>
            <article className="car-details">
                <h2>{car.car_brands} {car.car_model}</h2>
                <p>Цвет: {car.car_color}</p>
                <p>Регистрационный номер: {car.car_register_number}</p>
                <p>Регион: {car.car_region_number}</p>
                <p>Пробег: {car.car_mileage}</p>
            </article>
        </section>
    )
}
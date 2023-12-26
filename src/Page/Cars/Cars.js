import React, {useEffect, useState} from 'react';
import {HeaderAdmin} from "../../components/Header/HeaderAdmin";
import {CarCard} from "../../components/CarCard/CarCard";
import './cars_style.css'

export const Cars = () => {
    const [cars, setCars] = useState([])

    const [manufacturerFilter, setManufacturerFilter] = useState('');
    const [maxMileageFilter, setMaxMileageFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');

    const filteredCars = cars.filter(car => {
        const passesManufacturer = !manufacturerFilter || car.car_brands.toLowerCase().includes(manufacturerFilter.toLowerCase());
        const passesMaxMileage = !maxMileageFilter || car.car_mileage <= parseInt(maxMileageFilter);
        const passesColor = !colorFilter || car.car_color.toLowerCase().includes(colorFilter.toLowerCase());

        return passesManufacturer && passesMaxMileage && passesColor;
    });


    useEffect(() => {
        const getCar = async () => {
            try {
                const response = await fetch('http://192.168.0.105:5000/cars',
                    {
                        method: 'GET'
                    })

                const data = await response.json()
                setCars(data)
            } catch (ex) {
                console.log(ex)
            }
        }
        getCar()
    }, []);

    return (
        <>
            <HeaderAdmin/>
            <article className="filter">
                <label>Производитель:</label>
                <input type="text" value={manufacturerFilter} onChange={(e) => setManufacturerFilter(e.target.value)}/>

                <label>Пробег:</label>
                <input type="number" value={maxMileageFilter} onChange={(e) => setMaxMileageFilter(e.target.value)}/>

                <label>Цвет:</label>
                <input type="text" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}/>
            </article>
            {
                filteredCars.length === 0 ? (
                    <p className="dataNotFound">Нет данных, подходящих под ваши фильтры</p>
                ) : (
                    filteredCars.map((car) => {
                        return (
                            <CarCard
                                key={car.car_id}
                                car={car}
                            />
                        )
                    })
                )
            }
        </>
    )
}
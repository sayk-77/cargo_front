import React, {useEffect, useState} from 'react';
import {HeaderAdmin} from "../../components/Header/HeaderAdmin";
import {DriverCard} from "../../components/DriverCard/DriverCard";

export const Drivers = () => {
    const [drivers, setDrivers] = useState([])

    const [nameFilter, setNameFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [dangerousCargoFilter, setDangerousCargoFilter] = useState(false);


    const filteredDrivers = drivers.filter(driver => {
        const passNameFilter =
            !nameFilter ||
            (
                driver.driver_last_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                driver.driver_first_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                driver.driver_midle_name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        const passExperienceFilter = !experienceFilter || driver.driver_experience >= parseInt(experienceFilter);
        const passDangerousCargoFilter = !dangerousCargoFilter || driver.driver_permission_dangerous_goods === dangerousCargoFilter;

        return passNameFilter && passExperienceFilter && passDangerousCargoFilter;
    })

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const response = await fetch('http://192.168.0.105:5000/drivers',
                    {
                        method: "GET"
                    })

                const data = await response.json()
                setDrivers(data)
            } catch (ex) {
                console.log(ex)
            }
        }
        getDrivers()
    }, []);

    return (
        <>
            <HeaderAdmin/>
            <article className="filter">
                <label>ФИО:</label>
                <input type="text" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/>

                <label>Стаж вождения (лет):</label>
                <input type="number" value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}/>

                <label>
                    Разрешение на опасные грузы:
                    <input type="checkbox" checked={dangerousCargoFilter}
                           onChange={(e) => setDangerousCargoFilter(e.target.checked)}/>
                </label>
            </article>
            {
                filteredDrivers.length === 0 ? (
                    <p className="dataNotFound">Нет данных, подходящих под ваши фильтры</p>
                ) : (
                    filteredDrivers.map((driver) => {
                        return (
                            <DriverCard
                                key={driver.driver_id}
                                driver={driver}
                            />
                        );
                    })
                )
            }
        </>
    )
}
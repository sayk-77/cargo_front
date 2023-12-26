import React, {useEffect, useState} from 'react';
import {HeaderAdmin} from "../../components/Header/HeaderAdmin";
import {ContractCard} from "../../components/ContractCard/ContractCard";
import {CarCard} from "../../components/CarCard/CarCard";

export const Contracts = () => {
    const [contracts, setContracts] = useState([])

    const [filteredContracts, setFilteredContracts] = useState([]);
    const [filters, setFilters] = useState({
        deliveryDate: '',
        driver: '',
        price: '',
        cargo: '',
        departurePoint: '',
        destination: ''
    });

    const filterContracts = () => {
        setFilteredContracts(contracts.filter(contract => {
            const driverName = contract.driver_name.toLowerCase();
            return (!filters.deliveryDate || contract.contract_delivery_time.includes(filters.deliveryDate)) &&
                (!filters.driver || driverName.includes(filters.driver.toLowerCase())) &&
                (!filters.price || contract.contract_price.includes(filters.price)) &&
                (!filters.cargo || contract.contract_cargo.includes(filters.cargo)) &&
                (!filters.departurePoint || contract.contract_departure_point.includes(filters.departurePoint)) &&
                (!filters.destination || contract.contract_destination.includes(filters.destination));
        }));
    };

    useEffect(() => {
        filterContracts();
    }, [filters, contracts]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        const getContract = async () => {
            const response = await fetch('http://192.168.0.105:5000/contracts',
                {
                    method: 'GET'
                })

            const data = await response.json()
            setContracts(data)
        }
        getContract()
    }, []);

    return(
        <>
            <HeaderAdmin/>
            <section className="filter">
                <input type="text" name="deliveryDate" placeholder="Дата доставки" value={filters.deliveryDate}
                       onChange={handleFilterChange}/>
                <input type="text" name="driver" placeholder="Водитель" value={filters.driver}
                       onChange={handleFilterChange}/>
                <input type="text" name="price" placeholder="Цена" value={filters.price}
                       onChange={handleFilterChange}/>
                <input type="text" name="cargo" placeholder="Груз" value={filters.cargo}
                       onChange={handleFilterChange}/>
                <input type="text" name="departurePoint" placeholder="Точка отправки" value={filters.departurePoint}
                       onChange={handleFilterChange}/>
                <input type="text" name="destination" placeholder="Пункт назначения" value={filters.destination}
                       onChange={handleFilterChange}/>
            </section>
            {
                filteredContracts.length === 0 ? (
                    <p className="dataNotFound">Нет данных, подходящих под ваши фильтры</p>
                ) : (
                    filteredContracts.map((contract) => {
                        return (
                            <ContractCard
                                key={contract.contract_id}
                                contract={contract}
                            />
                        )
                    })
                )
            }
        </>
    )
}
import './App.css';
import {Button, Table} from "react-bootstrap";
import {useState} from "react";
import {de, en, Faker, uk} from "@faker-js/faker";

import "bootstrap/dist/css/bootstrap.min.css"

function App() {

    const defaultNumberOfUsers = 20;
    const [users, setUsers] = useState([]);
    const [uiLocalization, setUiLocalization] = useState({});
    let counter = 1;

    let faker = new Faker({
        locale: [en],
    });

    function updateLanguage(localization) {

        faker = new Faker({
            locale: [localization],
        });
        let na = (faker.helpers.multiple(create, {
            count: defaultNumberOfUsers,
        }))
        setUsers(na);
        localizeUI(localization);
    }

    function create() {
        return {
            id: faker.string.uuid(),
            fullName: faker.person.fullName(),
            city: faker.location.city(),
            street: faker.location.street(),
            buildingNumber: faker.location.buildingNumber(),
            phoneNumber: faker.phone.number(),
        }
    }

    function localizeUI(localization) {
        if (localization === en) {
            setUiLocalization({
                fullName: "Full name",
                address: "Address",
                phoneNumber: "Phone number",
            });
        } else if (localization === de) {
            setUiLocalization({
                fullName: "Vollständiger Name",
                address: "Adresse",
                phoneNumber: "Telefonnummer",
            });
        } else if (localization === uk) {
            setUiLocalization({
                fullName: "Повне ім'я",
                address: "Адреса",
                phoneNumber: "Номер телефону",
            });
        }
    }

    return (
        <div className="App">
            <header>
                <div className="Localization">
                    <Button
                        onClick={() => {
                            updateLanguage(en)
                        }}>
                        EN
                    </Button>
                    <Button
                        onClick={() => {
                            updateLanguage(de)
                        }}>
                        DE
                    </Button>
                    <Button
                        onClick={() => {
                            updateLanguage(uk)
                        }}>
                        UK
                    </Button>
                </div>
            </header>

            <Table Users>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Id</th>
                    <th>{uiLocalization.fullName}</th>
                    <th>{uiLocalization.address}</th>
                    <th>{uiLocalization.phoneNumber}</th>
                </tr>
                </thead>

                <tbody>
                {users?.map((user) => {
                    return (
                        <tr>
                            <th>{counter++}</th>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.city}, {user.street}, {user.buildingNumber}</td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default App;

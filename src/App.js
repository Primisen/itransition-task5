import './App.css';
import {Button, Form, Table} from "react-bootstrap";
import {useState} from "react";
import {de, en, Faker, RandomModule, uk} from "@faker-js/faker";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

    const defaultNumberOfUsers = 20;
    const [seed, setSeed] = useState(2);
    const [localization, setLocalization] = useState(en);
    const [faker, setFaker] = useState(new Faker({
        locale: [localization],
    }));
    const [users, setUsers] = useState(createUsers());
    const [uiLocalization, setUiLocalization] = useState({
        fullName: "Full name",
        address: "Address",
        phoneNumber: "Phone number",
        enterSeedLabel: "Enter seed",
        enterButton: "Enter",
    });

    let counter = 1;

    function updateLanguage(localization) {
        setFaker(new Faker({
            locale: [localization],
        }))
        setLocalization(localization);
        setUsers(createUsers);//
        localizeUI(localization);//
    }

    function createUser() {
        return {
            id: faker.string.uuid(),
            fullName: faker.person.fullName(),
            city: faker.location.city(),
            street: faker.location.street(),
            buildingNumber: faker.location.buildingNumber(),
            phoneNumber: faker.phone.number(),
        }
    }

    function createUsers(){
        faker.seed(Number(seed));
        return  (faker.helpers.multiple(createUser, {
            count: defaultNumberOfUsers,
        }))
    }

    function regenerateUsers(event) {//
        event.preventDefault();
         setUsers(createUsers());
    }

    function regenerateUsersByRandom(event) {//
        event.preventDefault();
        setSeed(randomNumberInRange(1, 1000));
        console.log(seed);
        setUsers(createUsers());
    }

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function localizeUI(localization) {//can separate
        if (localization === en) {
            setUiLocalization({
                fullName: "Full name",
                address: "Address",
                phoneNumber: "Phone number",
                enterSeedLabel: "Enter seed",
                enterButton: "Enter",
            });
        } else if (localization === de) {
            setUiLocalization({
                fullName: "Vollständiger Name",
                address: "Adresse",
                phoneNumber: "Telefonnummer",
                enterSeedLabel: "Seed einfügen",
                enterButton: "Eingeben",
            });
        } else if (localization === uk) {
            setUiLocalization({
                fullName: "Повне ім'я",
                address: "Адреса",
                phoneNumber: "Номер телефону",
                enterSeedLabel: "Введіть seed",
                enterButton: "Введіть",
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

            <Form >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{uiLocalization.enterSeedLabel}</Form.Label>
                    <Form.Control
                        type="number"
                        name="seed"
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder={uiLocalization.enterSeedLabel}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={regenerateUsers}
                  >
                    {uiLocalization.enterButton}
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={regenerateUsersByRandom}
                >
                    Random
                </Button>
            </Form>

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

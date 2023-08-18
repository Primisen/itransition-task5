import './App.css';
import {Button, Form, Stack, Table} from "react-bootstrap";
import {useState} from "react";
import {de, en, Faker, RandomModule, uk} from "@faker-js/faker";
import "bootstrap/dist/css/bootstrap.min.css"
import 'toolcool-range-slider';

function App() {

    let seed = 23;

    const defaultNumberOfUsers = 20;
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


    //sync and async seed

    function setSeed (newSeed) {
        seed = newSeed;
    }

    const [mistakesNumber, setMistakesNumber] = useState(1000);//with big number exist bugs

    const MISTAKES_TYPES_NUMBER = 3;

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
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            city: faker.location.city(),
            street: faker.location.street(),
            buildingNumber: faker.location.buildingNumber(),
            phoneNumber: faker.phone.number(),
        }
    }

    function createUsers() {
        faker.seed(Number(seed));
        return (faker.helpers.multiple(createUser, {
            count: defaultNumberOfUsers,
        }))
    }

    function regenerateUsers(event) {//
        event.preventDefault();
        setUsers(createUsers());
    }

    function regenerateUsersByRandom(event) {//
        event.preventDefault();
        setSeed(randomNumberInRange(1, 10));
        // console.log(seed);
        setUsers(createUsers());

        // chooseMistake();
        makeMistakes();
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

    function generateMissingCharacterMistake(string, position) {// rename to -> delete character
        return string.replace(string.charAt(position), "");
    }

    function generateExtraCharacterMistake(string, position) {
        return string.slice(0, position)
            + string.charAt(0) + string.slice(position);
    }

    function generateSwappedCharacterMistake(string, position) {
        const a = string.charAt(position);
        const b = string.charAt(position + 1);
        return string.substring(0, position) + b + a;
    }

    function chooseMistake(string, position) {
        if (seed * string.length % MISTAKES_TYPES_NUMBER === 0) {//copy code
            console.log("mistake 1");
            return generateMissingCharacterMistake(string, position);
        } else if (seed * string.length % MISTAKES_TYPES_NUMBER === 1) {
            console.log("mistake 2");
            return generateExtraCharacterMistake(string, position);
        } else if (seed * string.length % MISTAKES_TYPES_NUMBER === 2) {
            console.log("mistake 3");
            return generateSwappedCharacterMistake(string, position);
        }
    }

    function getPosition(string) {
        const position = seed * mistakesNumber % (string.length - 1);//when seed 0 then it works strange
        return position;
    }

    function makeMistakes() {
        let newUsers = [];

        for (let i = 0; i < users.length; i++) {

            let newUser = users[i];
            const originalSeed = seed;

            for (let j = 0; j < mistakesNumber; j++) {

                // console.log("VALUE: " + seed * 11 % 9);
                let value = Math.ceil((seed *  1103515245 + 12345)  / 65536 % 32768);
                console.log("VALUE: " + value);
                // setSeed(value);
                seed = value


                console.log("seed: " + seed);


                let email = users[i].email;
                let position = getPosition(email);
                email = chooseMistake(email, position);
                // users[i].email = email;

                let fullName = users[i].fullName;
                position = getPosition(fullName);
                fullName = chooseMistake(fullName, position);
                // users[i].fullName = fullName;

                let city = users[i].city;
                position = getPosition(city);
                city = chooseMistake(city, position);
                // users[i].city = city;

                let street = users[i].street;
                position = getPosition(street);
                street = chooseMistake(street, position);
                // users[i].street = street;


                let buildingNumber = users[i].buildingNumber;
                position = getPosition(buildingNumber);
                buildingNumber = chooseMistake(buildingNumber, position);
                // users[i].buildingNumber = buildingNumber;


                let phoneNumber = users[i].phoneNumber;
                position = getPosition(phoneNumber);
                phoneNumber = chooseMistake(phoneNumber, position);
                // users[i].phoneNumber = phoneNumber;

                newUser = {
                    email: email,
                    fullName: fullName,
                    city: city,
                    street: street,
                    buildingNumber: buildingNumber,
                    phoneNumber: phoneNumber
                };
            }

            newUsers.push(newUser);
            // setSeed(originalSeed);
            seed = originalSeed
        }

        setUsers(newUsers);
    }

    function generateStringFromUser(user) {


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

            <div className="numberOfMistakes">
                <toolcool-range-slider min="10" max="50"></toolcool-range-slider>
            </div>


            <Form>
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
                    <th>Email</th>
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
                            <td>{user.email}</td>
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

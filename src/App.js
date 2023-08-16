import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {en, en_AU, Faker, faker, sv, uk} from "@faker-js/faker";

function App() {

    const [name, setName] = useState("");

    let faker = new Faker({
        locale: [en],
    });

    function updateLanguage(localization) {
        setName(createUser(localization));
    }

    function createUser(localization) {
        faker = new Faker({
            locale: [localization],
        });
        return {
            name: faker.person.firstName(),
        }.name.toString();
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
                            updateLanguage(sv)
                        }}>
                        SV
                    </Button>
                    <Button
                        onClick={() => {
                            updateLanguage(uk)
                        }}>
                        UK
                    </Button>
                </div>
            </header>

            <div>
                {name}
            </div>
        </div>
    );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

function App() {

    function updateLanguage(localization) {
        console.log(localization);
    }

    // useEffect(() => {
    //     updateLanguage("en");
    // }, []);

    return (
        <div className="App">
            <header>
                <div className="Localization">
                    <Button
                        onClick={() => {
                            updateLanguage("en")
                        }}>
                        EN
                    </Button>
                    <Button
                        onClick={() => {
                            updateLanguage("sv")
                        }}>
                        SV
                    </Button>
                    <Button
                        onClick={() => {
                            updateLanguage("uk")
                        }}>
                        UK
                    </Button>
                </div>
            </header>

            <div>
            </div>
        </div>
    );
}

export default App;

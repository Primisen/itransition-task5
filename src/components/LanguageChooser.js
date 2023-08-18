import React from "react";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function LanguageChooser({localizeFaker}) {

    const {i18n} = useTranslation();

    return (
        <div className="Localization">
            <Button
                value="en"
                onClick={(e) => {
                    i18n.changeLanguage(e.target.value);
                    localizeFaker(e.target.value);
                }}>
                EN
            </Button>
            <Button
                value="de"
                onClick={(e) => {
                    i18n.changeLanguage(e.target.value);
                    localizeFaker(e.target.value);

                }}>
                DE
            </Button>
            <Button
                value="uk"
                onClick={(e) => {
                    i18n.changeLanguage(e.target.value);
                    localizeFaker(e.target.value);
                }}>
                UK
            </Button>
        </div>
    )
}

LanguageChooser.propTypes = {
    localizeFaker: PropTypes.func.isRequired
}

export default LanguageChooser
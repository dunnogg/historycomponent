import React from 'react';
import './App.css';
import YearComponent from "./components/YearText/YearText";

const dotsData = [
    {
        label: "Начало эры цифровых технологий",
        yearLeft: "1990",
        yearRight: "2000",
        events: [
            {year: 1991, text: "Создана первая веб-страница."},
            {year: 1995, text: "Запущен интернет-браузер Internet Explorer."},
            {year: 1998, text: "Основана компания Google."},
            {year: 1998, text: "Основана компания Google."},
            {year: 1998, text: "Основана компания Google."},

        ],
    },
    {
        label: "Расцвет мобильных технологий",
        yearLeft: "2000",
        yearRight: "2010",
        events: [
            {year: 2004, text: "Запущен Facebook."},
            {year: 2007, text: "Apple представила первый iPhone."},
            {year: 2008, text: "Запущен Android от Google."},
            {year: 2008, text: "Запущен Android от Google."},
        ],
    },
    {
        label: "Эпоха искусственного интеллекта",
        yearLeft: "2010",
        yearRight: "2020",
        events: [
            {year: 2012, text: "Прорыв в области машинного обучения."},
            {year: 2015, text: "Создана первая версия OpenAI GPT."},
            {year: 2018, text: "ИИ достиг уровня человеческой точности в распознавании изображений."},
            {year: 2018, text: "ИИ достиг уровня человеческой точности в распознавании изображений."},
        ],
    },
    {
        label: "Будущее технологий",
        yearLeft: "2020",
        yearRight: "2030",
        events: [
            {year: 2023, text: "Развитие квантовых компьютеров."},
            {year: 2025, text: "Прогресс в области биотехнологий и искусственных органов."},
            {year: 2028, text: "Искусственный интеллект стал неотъемлемой частью общества."},
            {year: 2028, text: "Искусственный интеллект стал неотъемлемой частью общества."},
        ],
    },
];

function App() {
    return (
            <YearComponent dotsData={dotsData}></YearComponent>

    );
}

export default App;

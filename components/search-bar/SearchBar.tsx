import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { DropDown } from '~/components/drop-down/DropDown';

import styles from "./SearchBar.module.scss";
import search from "~/assets/images/search.svg";

interface ISearchBarProps { }

const MotivationalSearchMessages = ["Let's find Who you are looking for!"];
const API_BASE_URL = "http://localhost:3000/api/search";

export function SearchBar(props: ISearchBarProps): JSX.Element {

    const [showAutoSuggest, setShowAutoSuggest] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [autoSuggestTerms, setAutoSuggestTerms] = useState<string[][]>([]);

    useEffect(() => {
        setShowAutoSuggest(searchTerm.length > 0);
        async function getAutoSuggestTerms() {
            const options = {
                method: 'POST',
                body: JSON.stringify({ query: searchTerm }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const results = await fetch(API_BASE_URL, options);
            if (results.status === 200) {
                const suggestions = (await results.json())
                console.log(suggestions);
                setAutoSuggestTerms(suggestions)
            }
        }
        getAutoSuggestTerms();

    }, [searchTerm]);

    const handleChange: ChangeEventHandler = (event: ChangeEvent<Element & { value: string }>) => {
        setSearchTerm(event.target?.value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    const randomFunPlaceholder = MotivationalSearchMessages[Math.floor(Math.random() * MotivationalSearchMessages.length)];

    return (
        <div className={styles.searchBarContainer}>
            <form onSubmit={handleSubmit} className={styles.searchBarForm}>
                <input type="text" value={searchTerm} onChange={handleChange} className={styles.searchBar} placeholder={randomFunPlaceholder}/>
                <div className={styles.searchIconContainer}>
                    <img src={search} alt="Magnifying glass search icon" className={styles.searchIcon} />
                </div>
            </form>
            <div className={styles.dropDownContainer}>
                <DropDown isOpen={showAutoSuggest} autoSuggestTerms={autoSuggestTerms} />
            </div>
        </div>    
    )
}
import { Component, type ReactNode } from "react";
import "./search-panel.css"

export default class SearchPanel extends Component{


    render(): ReactNode {
        return <section className="search-panel">
            <button className="search-button" type="button" aria-label="Search">
                <span className="material-symbols-outlined">search</span>
            </button>
            <input className="search-input-field" type="search" placeholder="Search"/>
            
        </section>
    }
}
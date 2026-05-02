import { Component, type ReactNode } from "react";
import "./search-pannel.css"

export default class SearchPannel extends Component{
    constructor(props) {
        super(props)


        this.state ={

        }
    }



    render(): ReactNode {
        return <section className="search-pannel">
            <span className="material-symbols-outlined search-button">search</span>
            <input className="search-input-field" type="search" placeholder="Search"/>
            
        </section>
    }
}
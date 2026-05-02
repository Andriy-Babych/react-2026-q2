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
            <input className="search-input-field" type="text" />
            <button className="search-button"></button>
        </section>
    }
}
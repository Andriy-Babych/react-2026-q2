import { Component, type ReactNode } from 'react';
import './result-section.css';

type ResultItem = {
  id: string;
  name: string;
  description: string;
};

type ResultSectionProps = {
  results: ResultItem[];
};

export default class ResultSection extends Component<ResultSectionProps> {
  render(): ReactNode {
    return (
      <section className="result-section">
        {this.props.results.map((resultElement) => (
          <div className="result-item" key={resultElement.id}>
            <div className="result-item_id">{resultElement.id}</div>
            <div className="result-item_name">{resultElement.name}</div>
            <div className="result-item_description">
              {resultElement.description}
            </div>
          </div>
        ))}
      </section>
    );
  }
}

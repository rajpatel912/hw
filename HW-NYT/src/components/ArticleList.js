import React, { Component } from 'react';
import ArticleNav from './ArticleNav';
import Article from './Article';

class ArticleList extends Component {

  renderList() {
    // Normalize search term
    let searchTerm = this.props.filterText.toLowerCase();
    // Empty array for store search hits
    let rows = [];
    // For every article in the articles prop...
    this.props.articles.forEach((article) => {
      let title = article.title.toLowerCase();
      // ...if the search term is *not* contained in the headline...
      if (title.indexOf(searchTerm) === -1 ) {
        // ...return nothing.
        return;
      }
      rows.push(<Article key={article.title} article={article} />);
    });
    // ...and return the entire array.
    return rows;
  } // renderList

  render() {
    return (
      <div>
        <div><ArticleNav /></div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
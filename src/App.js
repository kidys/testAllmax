import React from 'react';

class App extends React.Component {
  state = {
    listRepository: []
  }

  fetchData(e) {
    fetch('https://api.github.com/search/repositories?q='+e.target.value).then(result => result.json()).then(data => {
      const dataResult = [];
      if(data.total_count > 0) {
        data.items.map(item => dataResult.push({
          url: item.html_url,
          title: item.full_name,
          stars: item.stargazers_count,
          watches: item.watchers_count
        }));
      }

      this.setState({
        listRepository: dataResult
      });
    });
  }

  render() {
    let liItems = this.state.listRepository.map(item => {
      return <li key={item.title}><div><a href={item.url} target="_blank" rel="noreferrer noopener">{item.title}</a></div><div><strong>Количество звезд:</strong>&nbsp;{item.stars}</div><div><strong>Число просмотров:</strong>&nbsp;{item.watches}</div></li>
    }) || 'Результатов нет';

    return (
      <div className="kidys-app">
        <input type="text" onChange={this.fetchData.bind(this)}/>
        <ul>
          {liItems}
        </ul>
      </div>
    )
  }
}

export default App;

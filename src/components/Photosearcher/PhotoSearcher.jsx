// import { element } from 'prop-types';
import { Component } from 'react';

const clientId = '5OkE-wB0kEgc7Vfel4RexOvABKRZzfs6SvSdQ6eU2B4';

class PhotoSearcher extends Component {
  state = {
    page: 1,
    photos: [],
    find: 'office',
  };
  componentDidMount() {
    this.findImages();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.findImages();
    }
  }

  SearchInput = event => {
    const find = event.currentTarget.value;
    this.setState({ find: find });
  };
  onSubmit = event => {
    event.preventDefault();
    console.log('submit');
    this.findImages();
  };
  findImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${this.state.page}&query=${this.state.find}&client_id=${clientId}`
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          photos: response.results.map(element => element.urls.small),
        });
      });
  };

  render() {
    const { photos, find, page } = this.state;

    const { SearchInput, onSubmit } = this;

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={find}
            type="text"
            placeholder="Text your request"
            onChange={SearchInput}
          />
          <button type="submit">search</button>
        </form>
        <ul>
          {photos.map(element => (
            <li key={element}>
              <img src={element} alt="pic" width="350" height="400" />
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            this.setState({
              page: page > 1 ? page - 1 : 1,
            })
          }
        >
          prev
        </button>
        <button
          onClick={() =>
            this.setState({
              page: page + 1,
            })
          }
        >
          next
        </button>
      </div>
    );
  }
}

export default PhotoSearcher;

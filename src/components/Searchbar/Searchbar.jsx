import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Header, Form, Button } from 'components/Searchbar/Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.error('Write a request!');
    }
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };
  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <span>
              <ImSearch size={25} />
            </span>
          </Button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

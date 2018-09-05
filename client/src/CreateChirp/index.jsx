import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CREATE_NEW_CHIRP = gql`
  mutation($text: String!) {
    createChirp(text: $text) {
      text
    }
  }
`;

class CreateChirp extends Component {
  state = {
    chirpText: '',
  };

  handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, createChirp) => {
    event.preventDefault();
    const { refetch } = this.props;

    createChirp().then(() => {
      this.setState({ chirpText: '' });
      refetch();
    });
  };

  render() {
    const { chirpText } = this.state;
    return (
      <section>
        <Mutation
          mutation={CREATE_NEW_CHIRP}
          variables={{ text: chirpText }}
          context={{
            headers: {
              'x-token': localStorage.getItem('chirpyToken'),
            },
          }}
        >
          {(createChirp) => (
            <form onSubmit={(event) => this.handleSubmit(event, createChirp)}>
              <textarea
                id="chirpText"
                name="chirpText"
                value={chirpText}
                onChange={this.handleChange}
              />
              <button type="submit">Chirp</button>
            </form>
          )}
        </Mutation>
      </section>
    );
  }
}

CreateChirp.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default CreateChirp;

import React, { Component } from 'react';
import { editUserInformation } from '../../services/authentication';

class PrivateEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      picture: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      // ...this.props.user
      name: this.props.user.name,
      email: this.props.user.email,
      picture: null
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, picture } = this.state;
    try {
      const user = await editUserInformation({
        name,
        email,
        picture
      });
      this.props.updateUserInformation(user);
      this.props.history.push('/private');
    } catch (error) {
      console.log(error);
    }
  }

  handleFileInputChange(event) {
    console.dir(event.target);
    const { name, files } = event.target;
    this.setState({
      [name]: files[0]
    });
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        <figure>
          <img src={user.picture} alt={user.name} />
        </figure>

        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <label htmlFor="picture">Profile Picture</label>
          <input type="file" id="picture" name="picture" onChange={this.handleFileInputChange} />
          <button>Update Profile</button>
        </form>
      </div>
    );
  }
}

export default PrivateEditView;

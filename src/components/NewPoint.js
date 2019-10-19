import React from "react";

export function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  fieldRef
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        ref={fieldRef}
      />
      <br />
    </>
  );
}

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPoint: {
        title: "",
        description: "",
        category: "",
        picture: [],
        mark: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePointAdd = this.handlePointAdd.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Merge changed form field into existing newBook object
    this.setState(prevState => ({
      newPoint: { ...prevState.newPoint, [name]: value }
    }));
  }

  handlePointAdd(event) {
    event.preventDefault();

    // Add point in the list of points
    this.props.handlePointAdd(this.state.newPoint);

    // Reset fields of the newPoint object
    this.setState({
      newPoint: {
        title: "",
        description: "",
        category: "",
        picture: [],
        mark: ""
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Add a new point</h2>
        <form onSubmit={this.handlePointAdd}>
          <FormInput
            type="text"
            name="title"
            placeholder="title"
            value={this.state.newPoint.title}
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="description"
            placeholder="description"
            value={this.state.newPoint.description}
            onChange={this.handleChange}
          />
          <FormInput
            type="number"
            name="mark"
            placeholder="mark"
            value={this.state.newPoint.mark}
            onChange={this.handleChange}
          />
          <FormInput
            type="file"
            name="image"
            placeholder="download picture"
            value={this.state.newPoint.picture}
            onChange={this.handleChange}
          />

          <li>
            <select
              value={this.state.newPoint.category}
              onChange={this.handleChange}
            >
              <option value="Business">Business</option>
              <option value="food">food</option>
              <option value="activites">activites</option>
              <option value="monuments">monuments</option>
            </select>
          </li>

          <button type="submit">Add Point</button>
        </form>
      </div>
    );
  }
}

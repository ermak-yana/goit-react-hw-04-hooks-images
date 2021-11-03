import { useState } from "react";
import PropTypes from "prop-types";
import css from "../Searchbar/Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Искать</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
Searchbar.propType = {
  onSubmit: PropTypes.func,
};
// class Searchbar extends Component {
//   state = {
//     value: "",
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.onSubmit(this.state.value);
//     this.setState({ value: "" });
//   };

//   handleChange = (e) => {
//     this.setState({ value: e.currentTarget.value.toLowerCase() });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={value}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propType = {
//   onSubmit: PropTypes.func,
// };

// export default Searchbar;

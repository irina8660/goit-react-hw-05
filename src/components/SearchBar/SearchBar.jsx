import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();
    if (query === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(query);
  };
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Enter film title..."
        className={s.input}
      />
      <button type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

import Card from "./Card";
import ComicCard from "./ComicCard";

const SearchResultCard = ({ data, category }) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.data.results.map((item, index) => {
        return category === "characters" ? (
          <Card key={index} data={item} />
        ) : (
          <ComicCard key={index} data={item} />
        );
      })}
    </div>
  );
};

export default SearchResultCard;

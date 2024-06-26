import barcelona from "../../../public/assets/images/barcelona.jpeg";
import egypt from "../../../public/assets/images/egypt.jpeg";
import london from "../../../public/assets/images/london.webp";
import newyork from "../../../public/assets/images/newyork.jpeg";
import rome from "../../../public/assets/images/rome.jpeg";
import sydney from "../../../public/assets/images/sydney.webp";
import tokyo from "../../../public/assets/images/tokyo.jpeg";

const cities = [
  { name: 'New York', image: newyork },
  { name: 'Barcelona', image: barcelona },
  { name: 'Tokyo', image: tokyo },
  { name: 'London', image: london },
  { name: 'Rome', image: rome },
  { name: 'Egypt', image: egypt },
  { name: 'Sydney', image: sydney }
];

const CitySlides = ({ onSearch }) => {
  const handleCityClick = (cityName) => {
    onSearch({ searchText: cityName.toLowerCase(), guests: 1 });
  };

  return (
    <div className="flex md:justify-center items-center gap-8 md:gap-20 my-10 mt-2 overflow-x-auto">
      {cities.map((city, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center cursor-pointer mt-8" 
          onClick={() => handleCityClick(city.name)}
        >
          <div className="rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 border-4 border-white hover:border-rose-400 hover:scale-110 transition">
            <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
          </div>
          <p className="mt-2 text-sm md:text-base">{city.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CitySlides;

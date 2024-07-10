import { CarProps, FilterProps } from "../types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '2c36fd558amshfc7972335273a0ap18dfe2jsncd19e22447df',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    options
  );
  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};


// utils/index.ts

export const postData = async (url: string, data: any) => {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
  }

  return response.json();
};

import { countryData } from "../data";

export  const getName = (e: string): any => {
    const res = countryData.filter((i) => {
      if (i.code.toLowerCase() === e.toLowerCase()) {
        return i.name;
      }
    });
    return res[0].name;
  };

export const getCode = (e: string): any => {
    const res = countryData.filter((i) => {
      if (i.name.toLowerCase() === e.toLowerCase()) {
        return i.code;
      }
    });
    return res[0].code;
  };



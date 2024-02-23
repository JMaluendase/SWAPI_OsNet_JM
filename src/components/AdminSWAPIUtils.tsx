import axios from "axios";

export interface GenericObject {
  [key: string]: any;
}

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      console.error("No hay array de results:", response.data.results);
      return [];
    }
  } catch (error) {
    console.error("Error llamando la data:", error);
    return [];
  }
};

export const processItems = async (items: GenericObject[]) => {
  const processedItems = await Promise.all(
    items.map(async (item) => {
      console.log(item);
      const processedItem: GenericObject = {};
      for (const [key, value] of Object.entries(item)) {
        console.log(value);
        // Verifica si el valor es diferente de null, undefined o un array vacío
        if (value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
          if (
            Array.isArray(value) &&
            typeof value[0] === "string" &&
            value[0].startsWith("http")
          ) {
            processedItem[key] = await fetchNamesFromUrls(value);
          } else if (typeof value === "string" && value.startsWith("http")) {
            processedItem[key] = await fetchNameFromUrl(value);
          } else {
            processedItem[key] = value;
          }
        }
      }
      return processedItem;
    })
  );

  // Filtra los objetos procesados para eliminar aquellos que estén vacíos
  const filteredItems = processedItems.filter(item => Object.keys(item).length > 0);

  return filteredItems;
};




export const fetchNamesFromUrls = async (urls: string[]) => {
  const names = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        return {
          name: response.data.name || response.data.title || "Unknown",
          url: url,
        };
      } catch (error) {
        console.error(`Error llamando la url: ${url}`, error);
        return { name: "Unknown", url: url };
      }
    })
  );
  return names;
};

export const fetchNameFromUrl = async (url: string) => {
  try {
    const response = await axios.get(url);
    return {
      name: response.data.name || response.data.title || "Unknown",
      url: url,
    };
  } catch (error) {
    console.error("Error llamando name de la url:", error);
    return { name: "Unknown", url: url };
  }
};

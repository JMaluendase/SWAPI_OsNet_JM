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
      return [];
    }
  } catch {
    return [];
  }
};

export const processItems = async (items: GenericObject[]) => {
  const processedItems = await Promise.all(
    items.map(async (item) => {
      const processedItem: GenericObject = {};
      for (const [key, value] of Object.entries(item)) {
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

  // Filtra los objetos procesados para eliminar los vacios
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
  } catch {
    return { name: "Unknown", url: url };
  }
};

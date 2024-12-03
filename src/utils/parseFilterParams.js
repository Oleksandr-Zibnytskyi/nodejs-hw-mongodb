const parseBoolean = (value) => {
    if (typeof value === 'string') {
      const lowercased = value.toLowerCase();
      if (lowercased === 'true') return true;
      if (lowercased === 'false') return false;
    }
    return undefined;
  };

  const parseContactType = (type) => {
    const validTypes = ['work', 'home', 'personal'];
    return validTypes.includes(type) ? type : undefined;
  };

  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseContactType(type);
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {
      contactType: parsedType,
      isFavourite: parsedIsFavourite,
    };
  };


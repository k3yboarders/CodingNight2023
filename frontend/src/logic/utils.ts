export const rolePrettyName = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "DRIVER":
      return "Kierowca";
    case "VOLUNTEER":
      return "Wolontariusz";
    default:
      return "Unknown";
  }
};

export const dangerTypePrettyName = (type: string): string => {
  switch (type) {
    case "BOMBING":
      return "Nalot";
    case "TERRORIST_ATTACK":
      return "Atak terrorystyczny";
    case "EARTHQUAKE":
      return "Trzęsienie ziemi";
    case "TSUNAMI":
      return "Tsunami";
    case "TORNADO":
      return "Tornado";
    case "FAMINE":
      return "Głód";
    case "ROAD_ACCIDENT":
      return "Wypadek drogowy";
    default:
      return "Unknown Danger Type";
  }
};
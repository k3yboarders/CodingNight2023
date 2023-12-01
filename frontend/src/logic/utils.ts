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

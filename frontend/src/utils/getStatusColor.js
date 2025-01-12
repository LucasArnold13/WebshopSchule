export const getStatusColor = (statusId) => {
    switch (statusId) {
      case 1: // Offen
        return "blue";
      case 2: // geschlossen
        return "green";
      case 3: // storniert
        return "red";
      default: // Default 
        return "gray";
    }
  };
export const getStatusColor = (statusId) => {
  switch (statusId) {
    case 1: // Offen
      return "#42A5F5"; // Hellblau (besser sichtbar)
    case 2: // Geschlossen
      return "#66BB6A"; // Hellgrün (freundlicher)
    case 3: // Storniert
      return "#EF5350"; // Kräftiges Rot (besserer Kontrast)
    default: // Default
      return "#BDBDBD"; // Hellgrau (neutral)
  }
};
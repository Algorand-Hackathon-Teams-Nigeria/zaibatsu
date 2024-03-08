import {
  Home,
  Chart1,
  Wallet2,
  Moon,
  NotificationBing,
  LogoutCurve,
  Sun1,
  SearchNormal1,
} from "iconsax-react";

export function returnIcon(icon: string, variant?: string) {
  let IconComponent: React.ComponentType<any> | null = null;

  switch (icon.toLowerCase()) {
    case "home":
      IconComponent = Home;
      break;
    case "chart":
      IconComponent = Chart1;
      break;
    case "wallet":
      IconComponent = Wallet2;
      break;

    case "moon":
      IconComponent = Moon;
      break;
    case "notification":
      IconComponent = NotificationBing;
      break;
    case "logout":
      IconComponent = LogoutCurve;
      break;
    case "sun":
      IconComponent = Sun1;
      break;
    case "search":
      IconComponent = SearchNormal1;
      break;
    default:
      // Handle unknown icons
      break;
  }

  // Render the IconComponent if it is not null
  return (
    IconComponent && <IconComponent variant={variant ? variant : "Linear"} />
  );
}

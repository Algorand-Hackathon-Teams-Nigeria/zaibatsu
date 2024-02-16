import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Zaibatsu" },
    {
      name: "description",
      content:
        "Bridging the gap between decentralized and centralized currencies",
    },
  ];
};

export default function Index() {
  return <div>Dashboard</div>;
}

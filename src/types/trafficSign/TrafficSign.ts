type TrafficSign = {
  id: string;
  meaning: string;
  name: string;
  children: Array<{
    id: string;
    name: string;
    image: string;
  }>;
};

export default TrafficSign;

import TrafficSign from "../trafficSign/TrafficSign";

type GroupTrafficSign = {
  id: string;
  effect: string;
  name: string;
  children?: Array<TrafficSign>;
};

export default GroupTrafficSign;

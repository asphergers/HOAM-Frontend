import axios, { Axios } from "axios"
import {useState} from "react";
import ModuleBox from "./modulebox";

const backAddr = "192.168.1.51";
const backPort =  8090;

const backUrl = `${backAddr}:${backPort}`

export interface Device {
  Address: string;
  Name: string;
}

interface Devices {
  Devices: Array<Device>;
}

export default function DeviceList() {
  let [devicesArr, setDevicesArr] = useState<Array<React.ReactElement>>([]);

  const getDevices = async (): Promise<Devices | null> => {
    const options = {
      method: "GET",
      url: `http://${backUrl}/devices`,
      withCredentials: false
    }

    let response: Devices | null = null;

    await axios.request(options)
      .then(function ({ data }: { data: Devices }) {
        console.log(data);
        response = data;
      }).catch(function(err: any) {
        console.log(err);
        response = null;
      })

    return response
  }

  const update = async () => {
    setDevicesArr([]);

    let deviceList: Devices | null = await getDevices();

    if (deviceList == null || deviceList.Devices == null) { return }

    let devices: Array<React.ReactElement> = [];

    deviceList.Devices.forEach(device => {
      const module = <ModuleBox Name={device.Name} Address={device.Address}/>
      devices.push(module);
    })

    setDevicesArr(devices);
  }

  const deviceList = devicesArr.map((device, index) => (
    <li key = {index}>
      {device}
    </li>
  ));

  return (
    <section>
      <button onClick={update}>
        Update
      </button>

      <ul>{deviceList}</ul>  
    </section>
  );
}


import axios from "axios";
import {useState} from "react";
import Popup from "reactjs-popup";
import { Device } from "./devicelist"

interface DefaultError {
  Error: string;
}

interface NameResponse {
  Name: string;
}

const requestAxios = async (options: Object): Promise<string | null> => {
    return await axios.request(options)
      .then(function ({ data }: { data: string }) {
        console.log(data);
        return JSON.stringify(data);
      }).catch(function(err: any) {
        console.log(err);
        return null;
      })
} 

export default function ModuleBox({ Address, Name }: Device) {
  const [address] = useState<string>(Address);
  const [name, setName] = useState<string>(Name);

  const toggle = async () => {
    const options = {
      method: "POST",
      url: "http://192.168.1.51:8090/toggle",
      withCredentials: false,
      data: { address: address }
    }

    await requestAxios(options)
  }

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    //what even is this shit? this language sucks ass
    const target = event.target as typeof event.target & {
      nameinput: { value: string }      
    }
    //

    const options = {
      method: "POST",
      url: "http://192.168.1.51:8090/name",
      withCredentials: false,
      data: { address: address, name: target.nameinput.value}
    }

    let response: string | null = await requestAxios(options);
    if (response == null) { console.log("axios error"); return }
  
    const deserialized: NameResponse | DefaultError = JSON.parse(response);

    if ("Error" in deserialized) {
      console.log(deserialized);
      return
    }

    if ("Name" in deserialized) {
      console.log(response)
      setName(deserialized.Name);
      return
    }
  }

  return (
    <section>
      <h1>Name: {name}</h1>
      <p>Address: {address}</p>
      <button onClick={toggle}>toggle</button>
      <Popup trigger={<button>change name</button>}>
        <form onSubmit={submit}>
          <label>
            Name: 
            <input type="nameinput" name="nameinput"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </Popup>
    </section>
  );
}

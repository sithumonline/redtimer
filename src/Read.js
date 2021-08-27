import { useQuery } from "react-query";
import axios from "axios";

function Read(props) {
  const deletePost = () => {
    axios.delete(`https://red-timer-api.herokuapp.com/api/v1${props.location.pathname}`);
  };

  const { isLoading, error, data } = useQuery("getPostOne", () =>
    axios
      .get(`https://red-timer-api.herokuapp.com/api/v1${props.location.pathname}`)
      .then((res) => res.data)
  );
  let coreContent;
  let loading = "Loading";

  if (error) {
    console.log(error);
  }

  if (!data) {
    if (isLoading) {
      coreContent = loading;
    }
  } else {
    coreContent = (
      <div>
        <div className="row">
          <p className="Time" key={data.data.ID}>
            {data.data.body}
          </p>
        </div>
        <div className="row">
          <button className="Button Red" onClick={deletePost}>
            Delete
          </button>
          <a href={"/post"}>
            <button className="Button">Post</button>
          </a>
        </div>
      </div>
    );
    console.log(data);
  }
  return <div className="App App-header">{coreContent}</div>;
}

export default Read;

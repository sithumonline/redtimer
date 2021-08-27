import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function Post() {
  const [post, setPost] = useState("");

  const { isLoading, error, data } = useQuery("getPost", () =>
    axios.get("http://localhost:3080/api/v1/post").then((res) => res.data)
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
    coreContent = Object.entries(data.data).map(([key, value]) => (
      <div className="row">
        <div className="" key={key}>
          <p className="Time">{value.body}</p>
          <a href={`/post/${value.ID}`}>
            <button className="Button">Read</button>
          </a>
        </div>
      </div>
    ));
    console.log(data);
  }

  const onCreate = () => {
    console.log("create : ", post);
    if (post === "") {
      return;
    }
    axios
      .post("http://localhost:3080/api/v1/post", { body: post })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="App App-header">
      {coreContent}
      <textarea
        className="App-controls Post"
        rows="4"
        cols="100"
        onChange={(e) => {
          setPost(e.target.value);
        }}
      ></textarea>
      <button className="Button Red" onClick={onCreate}>
        Create
      </button>
    </div>
  );
}

export default Post;

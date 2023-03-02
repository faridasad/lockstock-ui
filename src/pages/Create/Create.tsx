import "./create.scss";

const Create = () => {
  return (
    <section className="create">
      <div className="wrapper">
        <h2>GENERATE IMAGE</h2>

        <form className="post-form">
          <input type="text" placeholder="Enter your name" />
          <form className="image-form">
            <input
              type="text"
              placeholder="Describe your image as you want to"
            />
            <button type="submit">Generate</button>
          </form>

          <div className="image-con">
            <img draggable="false" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="" />
          </div>

          <button type="submit">SHARE</button>
        </form>
      </div>
    </section>
  );
};

export default Create;

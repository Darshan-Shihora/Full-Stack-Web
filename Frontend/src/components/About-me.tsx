import img from "../../src/assests/profile.png";
function AboutMe() {
  return (
    <div className="h-auto text-center my-8 sm:mx-60 ml-10 ">
      <h1 className="h-auto text-3xl font-bold text-start py-8">About me</h1>
      <div className="flex">
        <div className="flex-col text-start font-serif pr-20">
          <p className="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, voluptatum corporis. Ea nemo quas modi sit eveniet, deserunt soluta itaque beatae quisquam architecto accusantium odit, ipsa ex veritatis? Adipisci libero ducimus deleniti recusandae nobis voluptate dolorum assumenda rerum dicta! Eius delectus nulla sequi eum unde mollitia molestias voluptate doloribus error!
          </p>
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed inventore, error corrupti magnam cumque est repudiandae distinctio sunt nam nihil earum nemo aliquid expedita, cum, amet corporis maxime nulla perferendis atque similique nostrum suscipit ipsa? Tempore nobis consequuntur dolores reprehenderit.
          </p>
          <p className="pb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat facilis odio cum, labore reprehenderit ea dolores repellat omnis possimus atque deserunt itaque natus officia praesentium similique sunt impedit nihil laboriosam autem! Itaque aperiam assumenda quasi beatae impedit aspernatur voluptas amet nam. Officia, quo voluptatibus nulla porro dolorum voluptatum ea sapiente sint quasi minima beatae odio facilis aliquam? Vel nihil illo atque voluptatem necessitatibus totam, in accusamus quaerat a, ipsam cupiditate?
          </p>
          <p>Contact me:</p>
          <a
            href="mailto: darshanshihora5@gmail.com "
            className="text-blue-600"
          >
            darshanshihora5@gmail.com
          </a>
        </div>
        <img className="h-80 w-80" src={img} alt="" />
      </div>
    </div>
  );
}

export default AboutMe;

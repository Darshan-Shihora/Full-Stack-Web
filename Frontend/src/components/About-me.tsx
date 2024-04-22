import img from "../../src/assests/profile.png";
function AboutMe() {
  return (
    <div className="h-auto text-center my-8 sm:mx-60 ml-10 ">
      <h1 className="h-auto text-3xl font-bold text-start py-8">About me</h1>
      <div className="flex">
        <div className="flex-col text-start font-serif pr-20">
          <p className="pb-4">
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop me
            anywhere you like on your page. I’m a great place for you to tell a
            story and let your users know a little more about you.
          </p>
          <p className="pb-4">
            This is a great space to write long text about your company and your
            services. You can use this space to go into a little more detail
            about your company. Talk about your team and what services you
            provide.
          </p>
          <p className="pb-4">
            Tell your visitors the story of how you came up with the idea for
            your business and what makes you different from your competitors.
            Make your company stand out and show your visitors who you are.
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

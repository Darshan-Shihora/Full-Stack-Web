import axios from "axios";
import {
  ActionFunction,
  Form,
  FormMethod,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";

const BlogForm: React.FC<{ method: FormMethod; blog: any }> = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  function cancelHandler() {
    navigate("..");
  }

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method={props.method}
      className="bg-gray-300 p-6 max-w-[40rem] my-8 mx-auto rounded"
    >
      <p>
        <label className="block w-full m-1 text-md" htmlFor="title">
          Title
        </label>
        <input
          className="block w-full p-1 bg-gray-100 rounded"
          id="title"
          type="text"
          name="title"
          required
          defaultValue={props.blog ? props.blog.title : ""}
        />
      </p>
      <p>
        <label className="block w-full m-1 text-md" htmlFor="image">
          Image URL
        </label>
        <input
          className="block w-full p-1 bg-gray-100 rounded"
          id="image"
          type="text"
          name="image"
          required
          defaultValue={props.blog ? props.blog.image : ""}
        />
      </p>
      <p>
        <label className="block w-full m-1 text-md" htmlFor="date">
          Date
        </label>
        <input
          className="block w-full p-1 bg-gray-100 rounded"
          id="date"
          type="date"
          name="date"
          required
          defaultValue={props.blog ? props.blog.date : ""}
        />
      </p>
      <p>
        <label className="block w-full m-1 text-md" htmlFor="description">
          Description
        </label>
        <textarea
          className="block w-full p-1 bg-gray-100 rounded"
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={props.blog ? props.blog.description : ""}
        />
      </p>
      <div className="flex flex-end gap-4 mt-5">
        <button
          type="button"
          className="py-3 px-5 w-24 rounded hover:bg-sky-600 bg-sky-400 text-white"
          onClick={cancelHandler}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          className={`py-3 px-5 ${
            isSubmitting ? "w-32" : "w-24"
          } rounded hover:bg-sky-600 bg-sky-400 text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default BlogForm;

export const action: ActionFunction = async ({ request, params }) => {
  const method = request.method;

  const data = await request.formData();

  const blogData = {
    image: data.get("image"),
    title: data.get("title"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const token = localStorage.getItem("Token");
  let url = "http://localhost:3001/blog";
  if (method === "PATCH") {
    const blogId = params.blogId;
    url = `http://localhost:3001/blog/${blogId}`;
  }
  try {
    const response = await axios({
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
      data: blogData,
    });
    console.log(response);
    return redirect("..");
  } catch (error) {
    console.log(error);
    if (error.request.responseURL === "http://localhost:3001/blog") {
      console.log("error can't add the blog");
      throw error;
      // return redirect("../../login");
    } else {
      console.log("error can't edit the blog");
      throw error;
      // return redirect("../../../login");
    }
  }
};

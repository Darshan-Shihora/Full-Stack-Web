import axios from "axios";
import { useState } from "react";
import {
  ActionFunction,
  Form,
  FormMethod,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Readable } from "stream";

const BlogForm: React.FC<{ method: FormMethod; blog: any }> = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [imageSrc, setImageSrc] = useState<string | null>(
    props.blog ? props.blog[0].image : null
  );
  const [formData, setFormData] = useState<any>({
    title: props.blog ? props.blog[0].title : "",
    date: props.blog ? props.blog[0].date : "",
    description: props.blog ? props.blog[0].description : "",
  });

  function cancelHandler() {
    navigate("..");
  }

  const isSubmitting = navigation.state === "submitting";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData((prevData: any) => ({
      ...prevData,
      image: file,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formDataWithImage = new FormData();
  //   for (const key in formData) {
  //     formDataWithImage.get(key);
  //   }
  //   formDataWithImage.get("image");
  //   console.log(formDataWithImage);

  //   try {
  //     const token = localStorage.getItem("Token");
  //     let url = "http://localhost:3001/blog";
  //     await axios({
  //       url: url,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //       method: "POST",
  //       data: formDataWithImage,
  //     });
  //     return redirect("..");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Form
      method={props.method}
      className="bg-gray-300 p-6 max-w-[40rem] my-8 mx-auto rounded"
      encType="multipart/form-data"
      // onSubmit={handleSubmit}
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
          defaultValue={props.blog ? props.blog[0].title : ""}
        />
      </p>
      <p>
        <label className="block w-full m-1 text-md" htmlFor="image">
          Image URL
        </label>
        <input
          className="block w-full p-1 bg-gray-100 rounded"
          id="image"
          type="file"
          name="image"
          required
          onChange={handleImageChange}
          defaultValue={props.blog ? props.blog[0].image : ""}
        />
      </p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          className="block w-full max-w-xs mx-auto rounded my-2"
        />
      )}
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
          defaultValue={props.blog ? props.blog[0].date : ""}
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
          defaultValue={props.blog ? props.blog[0].description : ""}
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
  // console.log(imageSrc);

  const data = await request.formData();

  const blogData = {
    image: data.get("image"),
    title: data.get("title"),
    date: data.get("date"),
    description: data.get("description"),
  };
  console.log(blogData);
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
        "Content-Type": "multipart/form-data",
      },
      method: method,
      data: blogData,
    });
    return redirect("..");
  } catch (error) {
    console.log(error);
    if (error.request.responseURL === "http://localhost:3001/blog") {
      console.log("error can't add the blog");
      throw error;
    } else {
      console.log("error can't edit the blog");
      throw error;
    }
  }
};
